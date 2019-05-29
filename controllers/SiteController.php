<?php

namespace app\controllers;

use app\models\Address;
use app\models\OrderItems;
use app\models\User;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\SignupForm;
use app\models\ContactForm;
use app\models\Item;
use app\models\Order;
use app\models\LiqPay;
use app\models\Viber;

class SiteController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function beforeAction($action)
    {
        if ($action->id == 'pay-api-answer' || $action->id == 'success') {
            Yii::$app->controller->enableCsrfValidation = false;
        }
        $session = Yii::$app->session;
        $session->open();
//        if ($session->has('language'))
//        {
//            $language =  $session->get('language');
//            \Yii::$app->language = $language;
//        }

        $session->close();

        return parent::beforeAction($action); // TODO: Change the autogenerated stub
    }

    public function actionIndex()
    {

        $items_type = $this->takeAllItems();

        return $this->render('index', ['items_type' => $items_type]);
    }

    public function actionDelivery()
    {
        $items_type = $this->takeAllItems();

        return $this->render('delivery', ['items_type' => $items_type]);
    }

    public function actionSuccess ()
    {
        return $this->render('success');
    }

    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();

//        $dec = $this->checkCaptcha();

//          if ( $dec->success === true) {
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        } elseif (Yii::$app->request->post()){
//             } else if(Yii::$app->request->post()){

            return $this->render('login', [
                'model' => $model, 'recaptcha' => true
            ]);
        }

        return $this->render('login', [
            'model' => $model,
        ]);
    }

    public function actionRegister()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->redirect('/?2');
        }

        $model = new SignupForm();
        if ($model->load(Yii::$app->request->post()) && $model->signup()) {
            return $this->redirect('/?3');
        }
        return $this->render('register', [
            'model' => $model,
        ]);
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }


    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }


    public function actionAbout()
    {
        return $this->render('about');
    }

    public function actionPayApiAnswer()
    {
        $liqpay = new LiqPay();
        $data = Yii::$app->request->post('data');
        $signature = Yii::$app->request->post('signature');

        $sign = $liqpay->answerApi($data);
        $dataDecode = $liqpay->decode_params($data);
        if ($sign == $signature)
        {
            $o = Order::find()->where(['id'=>$dataDecode['order_id']])->andWhere(['paymant_method'=>'online'])->one();
            $o->status_pay = 100;
            $o->save();

            Yii::$app->telegram->sendMessage([
                'chat_id' => '132169247',
                'text' => 'Заказ №'.$o->id.' успешно оплачен картой онлайн.',
            ]);
        }

        Yii::trace('sign'.$sign);
        Yii::trace('$signature'.$signature);
        Yii::trace('$data[]'.$dataDecode['status']);

        foreach ($dataDecode as $q=>$a)
        {
            Yii::trace('$ '.$q.'  '.$a);
        }

    }
    public function actionBasket()
    {
        $model = new Order();

        if ($model->load(Yii::$app->request->post())) {
            if ($model->validate()) {
                $model->order_status = 'new';
                $model->status_pay = 0;
                if (!Yii::$app->user->isGuest) {
                    $model->user_id = Yii::$app->user->getId();
                    if(!Address::find()->where(['user_id'=>Yii::$app->user->getId()])->count())
                    {
                        $address = new Address();
                        $address->u_name = $model->u_name;
                        $address->u_tel = $model->u_tel;
                        $address->u_email = $model->u_email;
                        $address->u_street = $model->u_street;
                        $address->u_house = $model->u_house;
                        $address->u_entrance = $model->u_entrance;
                        $address->u_floor = $model->u_floor;
                        $address->u_flat = $model->u_flat;
                        $address->user_id = Yii::$app->user->getId();
                        $address->save();
                    }
                }
                if ($model->save())
                {
                    $total_price = Order::saveItems($model);
                    $model->total_price = $total_price;
                    $model->save();

                    $this->sendTelegram($model);
                } else {
                    echo 'Error save Order';
                    exit;
                }

                switch ($model->paymant_method)
                {
                    case 'online':

                        if($total_price > 0) {
                            $html = $this->generateLiqForm($model->id,  $total_price);
                        } else {
                            echo 'Error цена не указана';
                            exit;
                        }

                        return $this->render('liqpay',['pay'=>$html]);
                        break;
                    default:
                        return $this->redirect('index');
                }

            }
        }

        $address = Address::find()->where(['user_id'=>Yii::$app->user->getId()]);
        if ($address->count())
        {
            $address = $address->one();
        } else {
            $address = new Address();
        }
        return $this->render('basket',[
            'model' => $model,
            'address'=>$address,
            ]);
    }



    public function actionProfile()
    {
        $address = Address::find()->where(['user_id'=>Yii::$app->user->getId()]);
        if ($address->count())
        {
            $address = $address->one();
        } else {
            $address = new Address();
        }

        if ($address->load(Yii::$app->request->post())) {
            if ($address->validate())
            {
                $address->user_id = Yii::$app->user->getId();
                if (!$address->save())
                {
                    echo 'Error save Address';
                    exit;
                }
            }
        }
        if (Yii::$app->request->post('Password'))
        {
            $cur_pass = Yii::$app->request->post('Password')['cur_password'];
            $new_pass = Yii::$app->request->post('Password')['new_password'];
            $new_pass2 = Yii::$app->request->post('Password')['new_password_2'];
            $user = User::find()->where(['id' => Yii::$app->user->getId()])->one();
            if ($new_pass === $new_pass2 && $user->validatePassword($cur_pass))
            {
                $user->changePassword($new_pass,$new_pass2);
            } else {
                echo 'Error Validation Password';
                exit;
            }

        }

        $orders = Order::find()->where(['user_id'=>Yii::$app->user->getId()])->asArray()->all();
        //->andWhere(['order_status'=>'completed'])

        foreach ($orders as $k=>$item)
        {
            $orders[$k]['items'] = OrderItems::find()->where(['order_id'=>$item['id']])->asArray()->all();
        }

        $items = Item::takeItems();

        return $this->render('profile',[
            'address'=>$address,
            'orders'=>$orders,
            'items'=>$items
        ]);
    }

    public function actionHistory()
    {
        $orders = Order::find()->where(['user_id'=>Yii::$app->user->getId()])->asArray()->all();
        //->andWhere(['order_status'=>'completed'])

        foreach ($orders as $k=>$item)
        {
            $orders[$k]['items'] = OrderItems::find()->where(['order_id'=>$item['id']])->asArray()->all();
        }

        $items = Item::takeItems();

        return $this->render('history', [
            'orders' => $orders,
            'items' => $items
        ]);
    }

    public function actionSetBasket ()
    {
        if (Yii::$app->request->isAjax)
        {
            Yii::$app->response->format = 'json';
            $name = Yii::$app->request->post('name');
            $size = Yii::$app->request->post('size');
            $item_id = (int)Yii::$app->request->post('item_id');
            $price = (double)Yii::$app->request->post('price');
            $value = (int)Yii::$app->request->post('value');

            $data = '';
            $data->name = $name;
            $data->size = $size;
            $data->item_id = $item_id;
            $data->price = $price;
            $data->value = $value;

            $session = Yii::$app->session;
            $session->open();
            if ($session->isActive)
            {
                if ($session->has('basket'))
                {
                    $basket = $session->get('basket');
                    if($basket[$item_id]){
                        $basket[$item_id]->price = $price;
                        $basket[$item_id]->value += $value;
                    } else {
                        $basket[$item_id] = $data;
                    }

                } else {
                    $basket = [];
                    $basket[$item_id] = $data;
                }
                $session->set('basket', $basket);
            }
            $session->close();

            return ['status' => true,'basket'=>$session->get('basket')];
        }
        return 'gg';
    }
    public function actionDeleteBasket ()
    {
        if (Yii::$app->request->isAjax) {
            Yii::$app->response->format = 'json';
            $item_id = (int)Yii::$app->request->post('item_id');

            $session = Yii::$app->session;
            $session->open();

            $basket = $session->get('basket');
            unset($basket[$item_id]);
            $session->set('basket', $basket);
            $session->close();
            return ['status' => true,'basket'=>$session->get('basket')];
        }
        return 'gg';
    }


    public function actionSendViber()
    {
        $Viber = new Viber();
        $Viber->message_post(
            '01234567890A=',
            [
                'name' => 'Admin', // Имя отправителя. Максимум символов 28.
//                'avatar' => 'http://avatar.example.com' // Ссылка на аватарку. Максимальный размер 100кб.
            ],
            'Test'
        );
    }
    private function sendTelegram($order)
    {
        $text = 'Новый заказ №'.$order->id." \n ";
        $text = $text.'Метод оплаты : '.$order->paymant_method." \n ";
        $text = $text.'Общая сумма : '.$order->total_price." \n ";
        $text = $text.'Имя : '.$order->u_name." \n ";
        $text = $text.'Телефон : '.$order->u_tel." \n ";
        $text = $text.'Email : '.$order->u_email." \n ";
        $text = $text.'Улица : '.$order->u_street." \n ";
        $text = $text.'Дом : '.$order->u_house." \n ";
        $text = $text.'Парадное : '.$order->u_entrance." \n ";
        $text = $text.'Этаж : '.$order->u_floor." \n ";
        $text = $text.'Квартира : '.$order->u_flat." \n ";

//        $sd = Yii::$app->telegram->getMe();

        $text = $text.'Состав Заказа:'." \n ";
        foreach ( OrderItems::find()->where(['order_id'=>$order->id])->asArray()->all() as $order_item)
        {
            $item = Item::find()->where(['id'=>$order_item['item_id']])->one();

            $text = $text.'Название: '.$item->name;
            $text = $text.' Цена: '.$item->price;
            $text = $text.' Количество: '.$order_item['value']." \n ";

        }

        $sd1 = Yii::$app->telegram->sendMessage([
            'chat_id' => '132169247',
            'text' => $text,
        ]);
        return $sd1;
//        var_dump($sd1);

    }
    private function generateLiqForm($order_id,$total_price)
    {
        $liqpay = new LiqPay();
        $html = $liqpay->cnb_form(array(
            'action'         => 'pay',
            'amount'         => $total_price,
            'currency'       => 'UAH',
            'description'    => 'Оплата заказа №'.$order_id,
            'order_id'       => $order_id,
            'version'        => '3',
            'result_url'     => 'http://pizza.infinitum.tech/web/site/success',
            'sandbox'        => '1'
        ));
       return $html;
    }

    private function takeAllItems ()
    {
        $items_type = [];
        $items = Item::find()->where(['OR', ['parent_id' => null], ['parent_id' => 0]])->orderBy('type')->asArray()->all();

        $popular = OrderItems::find()->select('id, item_id, SUM(value) as sval')
            ->groupBy(['item_id'])
            ->orderBy('sval DESC')
            ->asArray()
            ->all();

        $limin_n = 0;
        foreach ($popular as $pop) {
            $i = Item::find()->where(['id' => $pop['item_id']])->andWhere(['OR', ['parent_id' => null], ['parent_id' => 0]])->asArray();
            if ($i->count()) {
                $i = $i->one();
                $items_type['Популярные'][] = $i;
                $limin_n = $limin_n + 1;
                if ($limin_n >= 3) {
                    break;
                }
            }
        }

        foreach ($items as $i => $parents) {
            $child = Item::find()->where(['parent_id' => $parents['id']])->select('id,price,weight,size')->asArray()->all();
            $items[$i]['child'] = $child;
            switch ($parents['type']){
                case 'pizza':
                    $items_type['Пицца'][] = $items[$i];
                    break;
                case 'salad':
                    $items_type['Салаты'][] = $items[$i];
                    break;
                case 'drink':
                    $items_type['Напитки'][] = $items[$i];
                    break;
                case 'souse':
                    $items_type['Соусы'][] = $items[$i];
                    break;
                default:  $items_type[$parents['type']][] = $items[$i]; break;
            }

        }
        return $items_type;
    }

    private function checkCaptcha ()
    {
        $captcha = Yii::$app->request->post('g-recaptcha-response');
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_FAILONERROR, TRUE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $req = [];
        $req['secret'] = "6Ld7Rj4UAAAAAB-tA75AqDezoZtGdVP3zM8J9QWN";
        $req['response'] = $captcha;
        $post_data = http_build_query($req, '', '&');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        $data = curl_exec($ch);
        return json_decode($data);
    }

}