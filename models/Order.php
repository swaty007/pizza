<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "order".
 *
 * @property integer $id
 * @property string $u_name
 * @property string $u_tel
 * @property string $u_email
 * @property string $u_street
 * @property string $u_house
 * @property string $u_entrance
 * @property string $u_floor
 * @property string $u_flat
 * @property string $paymant_method
 * @property integer $status_pay
 * @property integer $order_status
 * @property integer $total_price
 * @property integer $user_id
 */
class Order extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'order';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['u_name', 'u_tel', 'u_house', 'u_street'], 'required'],
            [['paymant_method','order_status'], 'string'],
            [['total_price'], 'number'],
            [['status_pay','user_id'], 'integer'],
            [['u_name', 'u_tel'], 'string', 'max' => 50],
            [['u_email', 'u_house', 'u_entrance', 'u_floor', 'u_flat'], 'string', 'max' => 60],
            [['u_street'], 'string', 'max' => 100],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'u_name' => 'Имя',
            'u_tel' => 'Телефон',
            'u_email' => 'Email',
            'u_street' => 'Улица',
            'u_house' => 'Дом',
            'u_entrance' => 'Парадное',
            'u_floor' => 'Этаж',
            'u_flat' => 'Квартира',
            'paymant_method' => 'Метод оплаты',
            'status_pay' => 'Status Pay',
            'order_status' => 'Order Status',
        ];
    }
    public static function saveItems($order)
    {
        $session = Yii::$app->session;
        $session->open();
        $basket = $session->get('basket');
        $total_price = 0;
        foreach ($basket as $item)
        {
            $a = Item::findOne($item->item_id);
            if ((double)$a->price !== (double)$item->price)
            {
                echo $a->price.'=='.$item->price;
                echo 'Цены не совпадают';
                $order->delete();
                exit;
            }
            $order_item = new OrderItems();
            $order_item->item_id = $item->item_id;
            $order_item->order_id = $order->id;
            $order_item->value = $item->value;
            if ( !$order_item->save() ){
                echo 'Error save order_items';
                $order->delete();
                exit;
            };
            $total_price += $a->price*$order_item->value;
        }

        $session->set('basket', null);
        $session->close();

        return $total_price;
    }

}
