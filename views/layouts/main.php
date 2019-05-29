<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
use yii\helpers\Url;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>

    <link href="/web/css/main.less" rel="stylesheet/less" type="text/css">


</head>
<body>
<?php $this->beginBody() ?>



<header class="header clearfix">
    <nav id="w0" class="navbar">
        <div class="container navbar-container">
            <div class="navbar-header">
                <button id="menu-btn" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#w0-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span id="bar-1" class=""></span>
                    <span id="bar-2" class=""></span>
                    <span id="bar-3" class=""></span>
                </button>
                <a class="navbar-brand"
                   href="<?= Url::to(['/site/index']); ?>"><?php echo Html::img('@web/images/logo3.png', ['alt' => 'logo']); ?>
                </a>
            </div>
            <div id="w0-collapse" class="collapse navbar-collapse text-center">

                <ul id="w1" class="navbar-nav nav text-center">
                    <li>
                        <a  class="<?php if (Yii::$app->controller->action->id == 'index') echo 'active' ?>"
                            href="<?= Url::to(['/site/index']); ?>">Главная</a>
                    </li>
                    <li>
                        <a  class="<?php if (Yii::$app->controller->action->id == 'delivery') echo 'active' ?>"
                            href="<?= Url::to(['/site/delivery']); ?>">Заказать доставку</a>
                    </li>
                    <li id="basket-li-has-item">
                        <a class="<?php if (Yii::$app->controller->action->id == 'basket') echo 'active' ?>"
                           href="<?= Url::to(['/site/basket']); ?>">Оформить заказ</a>
                    </li>
                    <li>
                        <a class="<?php if (Yii::$app->controller->action->id == 'contact') echo 'active' ?>"
                           href="<?= Url::to(['/site/contact']); ?>">Контакты</a>
                    </li>
                    <li>
                        <a class="<?php if (Yii::$app->controller->action->id == 'about') echo 'active' ?>"
                           href="<?= Url::to(['/site/about']); ?>">Про Нас</a>
                    </li>
                    <li class="hidden-lg hidden-md divider-line"></li>
                </ul>

                <ul class="navbar-nav nav text-center navbar-right">
                    <li id="basket-effect" class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="">
                            <span id="n_of_cur" class="badge">14</span>
                            Корзина
                            <span class="caret"></span>
                        </a>

                        <div id="basket" class="dropdown-menu">
                            <div class="basket-wrap-nav">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Цена</th>
                                        <th>Количество</th>
                                    </tr>
                                    </thead>
                                    <tbody id="itemsli">
                                    </tbody>
                                </table>
                                <p class="desc">Количество позиций: <span class="position"></span></p>
                                <p class="desc">Количество товаров: <span class="value"></span></p>
                                <p class="desc">Общая сумма: <span class="price"></span></p>
                                <a class="basket-btn-confirm" href="<?= Url::to(['/site/basket']); ?>">Оформить заказ</a>
                            </div>
                            <div class="empty-basket">
                                <p class="desc">Ваша корзина пуста<span></span></p>
                            </div>
                        </div>
                    </li>

                    <?php if(Yii::$app->user->isGuest):?>
                        <li class="<?php if (Yii::$app->controller->action->id == 'register') echo 'active' ?>">
                            <a href="<?= Url::to(['/site/register']); ?>">Регистрация</a></li>
                        <li class="<?php if (Yii::$app->controller->action->id == 'login') echo 'active' ?>">
                            <a href="<?= Url::to(['/site/login']); ?>">Логин</a>
                        </li>
                    <?php else:?>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="">
                                <?= Yii::$app->user->identity->username?>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="<?= Url::to(['site/history'])?>">История заказов</a>
                                </li>
                                <li>
                                    <a href="<?= Url::to(['site/profile'])?>">Профиль</a>
                                </li>
                                <li>
                                    <a href="<?= Url::to(['site/logout'])?>" data-method="post">Выйти</a>
                                </li>
                            </ul>
                        </li>
                    <?php endif;?>
                </ul>
            </div>
        </div>
    </nav>
</header>

<script type="text/javascript">

    var basket = [
        <?php foreach (Yii::$app->session->get('basket') as $bask_item):?>
        {
            name:'<?=$bask_item->name?>',
            size:'<?=$bask_item->size?>',
            item_id:<?=$bask_item->item_id?>,
            price:<?=$bask_item->price?>,
            value:<?=$bask_item->value?>
        },
        <?php endforeach;?>
        ];

    document.addEventListener("DOMContentLoaded", function () {
        updateBasketHTML(basket);
    });

</script>

<?php if(Yii::$app->session->hasFlash('PostChanged')): ?>
    <div class="alert alert-success">
        Your post has successfully been changed!
    </div>
<?php endif; ?>

<?php if(Yii::$app->session->hasFlash('PostDeleted')): ?>
    <div class="alert alert-success">
        Your post has successfully been deleted!
    </div>
<?php endif; ?>


<?php if(Yii::$app->controller->id == 'item'): ?>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <ul class="nav nav-pills">
                    <li role="presentation" class="<?php if (Yii::$app->controller->action->id == 'index') echo 'active' ?>">
                        <a href="<?= Url::to(['/item/index']); ?>">Товары</a>
                    </li>
                    <li role="presentation" class="<?php if (Yii::$app->controller->action->id == 'status') echo 'active' ?>">
                        <a href="<?= Url::to(['/item/status']); ?>">Статус заказов</a>
                    </li>
                    <li role="presentation" class="<?php if (Yii::$app->controller->action->id == 'archive') echo 'active' ?>">
                        <a href="<?= Url::to(['/item/archive']); ?>">Архив</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
<?php endif; ?>

<?= Breadcrumbs::widget([
    'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
    'homeLink' => ['label' => 'Жили Были', 'url' => '/','template'=>'<li>{link}</li>'],
    'itemTemplate' => '<li class="active">{link}</li>'
]) ?>
                <?= Alert::widget() ?>
<div class="wrap-block-main">
                <?= $content ?>
</div>



        <section id="facts-times">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="counter_number">
                            <p class="countingIcon"><i class="fa fa-pie-chart"></i></p>
                            <h3 class="couting" id="fun-level">0</h3><span class="desc">Пицц сделанно</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="counter_number">
                            <p class="countingIcon"><i class="fa fa-handshake-o"></i></p>
                            <h3 class="couting" id="fun-level2">0</h3><span class="desc">Людей доверилось нам</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="counter_number">
                            <p class="countingIcon"><i class="glyphicon glyphicon-thumbs-up"></i></p>
                            <h3 class="couting" id="fun-level3">0</h3><span class="desc">Гарантия качества</span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="counter_number">
                            <p class="countingIcon"><i class="fa fa-truck"></i></p>
                            <h3 class="couting"><span>От </span><span id="fun-level4">0</span> </h3><span class="desc">Доставка</span>
                        </div>
                    </div>
                    <script>
                      document.addEventListener("DOMContentLoaded", function () {
                         $('#fun-level').animateNumber(
                             {
                                 number: 1352,
//                               'font-size': '30px',
                                 easing: 'easeInQuad'
                             },
                             10000
                         );
                         $('#fun-level2').animateNumber(
                             {
                                 number: 4231,
//                               'font-size': '30px',
                                 easing: 'easeInQuad'
                             },
                             15000
                         );
                         var percent_number_step = $.animateNumber.numberStepFactories.append(' %');
                         $('#fun-level3').animateNumber(
                             {
                                 number: 100,
//                               'font-size': '30px',
                                 easing: 'easeInQuad',
                                 numberStep: percent_number_step
                             },
                             20000
                         );



                           var percent_number_step1 = $.animateNumber.numberStepFactories.append(' минут');
                           $('#fun-level4').animateNumber(
                               {
                                   number: 30,
//                               'font-size': '30px',
                                   easing: 'easeInQuad',
                                   numberStep: percent_number_step1
                               },
                               3000
                           );
                     });
                   </script>
            </div>
       </div>
   </section>



<footer id="footer" class="footer">
    <div class="container">
        <div class="row">

            <div class="col-md-4 col-sm-4">
                <ul class="nav nav-pills nav-stacked nav-block">
                    <li class="title">
                        <h3>FEATURES</h3>
                    </li>
                    <li>
                        <a  class="<?php if (Yii::$app->controller->action->id == 'index') echo 'active' ?>"
                            href="<?= Url::to(['/site/index']); ?>">Главная</a>
                    </li>
                    <li>
                        <a  class="<?php if (Yii::$app->controller->action->id == 'delivery') echo 'active' ?>"
                            href="<?= Url::to(['/site/delivery']); ?>">Заказать доставку</a>
                    </li>
                    <li>
                        <a  class="<?php if (Yii::$app->controller->action->id == 'contact') echo 'active' ?>"
                            href="<?= Url::to(['/site/contact']); ?>">Контакты</a>
                    </li>
                    <li>
                        <a  class="<?php if (Yii::$app->controller->action->id == 'about') echo 'active' ?>"
                            href="<?= Url::to(['/site/about']); ?>">Про Нас</a>
                    </li>
                </ul>
            </div>

            <div class="col-md-3 col-sm-3">
                <ul class="nav nav-pills nav-stacked nav-block">
                    <li class="title">
                        <h3>SUPPORT</h3>
                    </li>
                    <li>
                        <a href="">Support Center </a>
                    </li>
                    <li>
                        <a href="">Knowledge Base</a>
                    </li>
                </ul>
            </div>

            <div class="col-md-5 col-sm-5">
                <ul class="nav nav-pills nav-stacked nav-block">
                    <li class="title">
                        <h3>LEGAL</h3>
                    </li>
                    <li>
                        <a href="tel:380938449020"><?=Yii::$app->params['telephone']?></a>
                    </li>
                    <li>
                        <a href="mailto:<?=Yii::$app->params['adminEmail']?>"><?=Yii::$app->params['adminEmail']?></a>
                    </li>
                    <li>
                        <a href="<?= Url::to(['/site/about']); ?>">Киев, Соломенский район, Микрорайон «Турецкий городок», Ул. Фёдор Эрнста 16в, «Жили были»</a>
                    </li>
                </ul>
            </div>
        </div>




        <div class="row">
            <div class="diviner-line col-md-2 col-md-offset-5"></div>
        </div>
        <a href="<?= Url::to(['/site/index']); ?>">
        <?php echo Html::img('@web/images/logo2.png', ['alt' => 'logo_mono','class'=>'logo-foot']); ?>
        </a>

        <p class="footer-text">Copyright © 2013-2018 Payens Inc. All rights reserved.</p>

    </div>
</footer>











<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
