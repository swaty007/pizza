<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */

$this->title = 'Профиль';
$this->params['breadcrumbs'][] = ['label'=>$this->title,'url'=> ['services'],'class'=>'']
?>


<section id="profile-block" class="profile-block">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><?= Html::encode($this->title) ?></h1>
            </div>
        </div>

        <div class="row">

            <div class="col-md-4">
                <ul class="main-nav tabs">

                    <li>
                        <a href="#tabHistory" data-toggle="tab" aria-expanded="true">
                            История заказов
                        </a>
                    </li>

                    <li>
                        <a href="#tabPassword" data-toggle="tab" aria-expanded="true">
                            Изменить пароль
                        </a>
                    </li>

                    <li class="active">
                        <a href="#tabAuthentification" data-toggle="tab" aria-expanded="true">
                            Изменить адресс доставки
                        </a>
                    </li>

                    <li>
                        <a href="<?= Url::to(['site/logout']) ?>" data-method="post">Выйти</a>
                    </li>

                </ul>
            </div>
            <div class="col-md-8">
                <div class="tab-content">

                    <div class="tab-pane fade" id="tabHistory">
                        <div class="panel panel-default history-block">
                            <div class="panel-heading">
                                <h3 class="panel-title">Изменить пароль</h3>
                            </div>

                            <div class="table-responsive history-table">
                                <table class="table table-striped table-hover table-condensed balance-table">
                                    <thead>
                                    <tr>
                                        <th>Состояние оплаты</th>
                                        <th>Статус заказа</th>
                                        <th>Метод оплаты</th>
                                        <th>Общая цена</th>
                                        <th colspan="2">Подробнее</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <?php foreach ($orders as $item):?>
                                        <tr class="<?php
                                        if ($item['order_status'] == 'new') {echo 'success';}
                                        else if ($item['order_status'] == 'in_progress') {echo 'info';}
                                        else if ($item['order_status'] == 'canceled') {echo 'warning';}
                                        else if ($item['order_status'] == 'completed') {echo 'success';} ?>">
                                            <td><?php if($item['status_pay'] === '100'){echo 'Оплаченно картой';}
                                                else if($item['status_pay'] === '0'){echo 'Не оплачено';} ?></td>
                                            <td>
                                                <?php if($item['order_status'] === 'new'){echo 'Новый';}
                                                else if($item['order_status'] === 'in_progress'){echo 'В процессе';}
                                                else if($item['order_status'] === 'completed'){echo 'Выполнен';}
                                                else if($item['order_status'] === 'canceled'){echo 'Отменен';} ?>
                                            </td>
                                            <td><?php if($item['paymant_method'] === 'cash'){echo 'Наличными';}
                                                else if($item['paymant_method'] === 'by_card'){echo 'Картой курьеру';}
                                                else if($item['paymant_method'] === 'online'){echo 'Онлайн картой';} ?></td>
                                            <td><?=$item['total_price'];?></td>
                                            <td>
                                                <a class="detailBtn" href="#">Подробнее</a>
                                            </td>
                                        </tr>

                                        <tr class="details">
                                            <td colspan="5">
                                                <div class="details" >

                                                    <h2 class="col-md-12 info-title">Состав заказа</h2>
                                                    <?php foreach ($item['items'] as $i):?>
                                                        <div class="col-md-6">
                                                            <div class="items">
                                                                <p class="info-details">Название : <span><?=$items[$i['item_id']]->name?></span></p>
                                                                <p class="info-details">Цена : <span><?=$items[$i['item_id']]->price?></span></p>
                                                                <p class="info-details">Размер : <span><?=$items[$i['item_id']]->size?></span></p>
                                                                <p class="info-details">Количество : <span><?=$i['value'];?></span></p>
                                                            </div>
                                                        </div>
                                                    <?php endforeach; ?>
                                                    <!--                                        <div class="col-md-6">-->
                                                    <!--                                            <h2 class="info-title">Данные пользователя</h2>-->
                                                    <!--                                            <p class="info-details">Имя : <span>--><?//=$item['u_name'];?><!--</span></p>-->
                                                    <!--                                            <p class="info-details">Телефон : <span>--><?//=$item['u_tel'];?><!--</span></p>-->
                                                    <!--                                            <p class="info-details">Улица : <span>--><?//=$item['u_street'];?><!--</span></p>-->
                                                    <!--                                            <div class="row">-->
                                                    <!--                                                <div class="col-md-6">-->
                                                    <!--                                                    <p class="info-details">Дом : <span>--><?//=$item['u_house'];?><!--</span></p>-->
                                                    <!--                                                </div>-->
                                                    <!--                                                <div class="col-md-6">-->
                                                    <!--                                                    <p class="info-details">Парадное : <span>--><?//=$item['u_entrance'];?><!--</span></p>-->
                                                    <!--                                                </div>-->
                                                    <!--                                                <div class="col-md-6">-->
                                                    <!--                                                    <p class="info-details">Этаж : <span>--><?//=$item['u_floor'];?><!--</span></p>-->
                                                    <!--                                                </div>-->
                                                    <!--                                                <div class="col-md-6">-->
                                                    <!--                                                    <p class="info-details">Квартира : <span>--><?//=$item['u_flat'];?><!--</span></p>-->
                                                    <!--                                                </div>-->
                                                    <!--                                            </div>-->
                                                    <!--                                        </div>-->
                                                </div>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                    <script>
                                        document.addEventListener("DOMContentLoaded", function () {

                                            var hideAll = function () {
                                                $('.history-table table').find('.details').slideUp();
                                            };
                                            hideAll();
                                            $('.history-table table a.detailBtn').on('click',function (e) {
                                                e.preventDefault();
                                                var n = $(this).parents('tr').index();
                                                if ($(this).parents('tbody').children('tr').eq(n+1).is(':hidden')) {
                                                    hideAll();
                                                }
                                                $(this).parents('tbody').children('tr').eq(n+1).slideToggle(300).find('div.details').slideToggle(300);
                                            });
                                        });
                                    </script>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <div class="tab-pane fade" id="tabPassword">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Изменить пароль</h3>
                            </div>

                            <form id="pass_form" action="/web/site/profile" method="post" class="clearfix form-horizontal form-password">
                                <input type="hidden" name="<?=Yii::$app->request->csrfParam?>"
                                       value="<?=Yii::$app->request->csrfToken?>"/>
                                <div class="form-group">
                                    <label class="control-label col-sm-3" for="f_cur_pass">Текущий пароль</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" id="f_cur_pass" name="Password[cur_password]" type="text"
                                               placeholder="" value="">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-sm-3" for="f_new_pass_1">Новый пароль</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" id="f_new_pass_1" name="Password[new_password]" type="password"
                                               placeholder="" value="">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-sm-3" for="f_new_pass_2">Повторите новый
                                        пароль</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" id="f_new_pass_2" name="Password[new_password_2]" type="password"
                                               placeholder="" value="">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-9 col-sm-offset-3">
                                        <button type="submit" class="main-btn" name="login-button">Изменить</button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>

                    <div class="tab-pane fade in active" id="tabAuthentification">

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Адресс доставки</h3>
                            </div>
                                        <?php $form = ActiveForm::begin([
                                            'id' => 'basket-form',
                                            'options' => [
                                                    'class' => 'form-password'
                                            ]
                                        ]); ?>
                                        <div class="row">
                                            <div class="col-sm-4 col-xs-12">
                                                <?= $form->field($address, 'u_name')->label('Имя') ?>
                                            </div>
                                            <div class="col-sm-4 col-xs-12">
                                                <?= $form->field($address, 'u_tel')->label('Телефон') ?>
                                            </div>
                                            <div class="col-sm-4 col-xs-12">
                                                <?= $form->field($address, 'u_email')->label('Email') ?>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <?= $form->field($address, 'u_street')->label('Улица') ?>
                                            </div>
                                            <div class="col-sm-2">
                                                <?= $form->field($address, 'u_house')->label('Дом') ?>
                                            </div>
                                            <div class="col-sm-2">
                                                <?= $form->field($address, 'u_floor')->label('Этаж') ?>
                                            </div>
                                            <div class="col-sm-2">
                                                <?= $form->field($address, 'u_flat')->label('Квартира') ?>
                                            </div>
                                            <div class="col-sm-2">
                                                <?= $form->field($address, 'u_entrance')->label('Парадное') ?>
                                            </div>
                                        </div>


                                        <div class="row">
                                            <div class="col-sm-12">
                                                <?= Html::submitButton('Изменить', ['class' => 'main-btn']) ?>
                                            </div>
                                        </div>
                                        <?php ActiveForm::end(); ?>

                        </div>

<!--                        <div class="auth-block">-->
<!--                            <ul class="main-nav second-tabs">-->
<!--                                <li class="active"><a href="#googleAuth" data-toggle="tab">Адресс доставки</a></li>-->
<!--                                <li><a href="#smsAuth" data-toggle="tab">Sms Authentification</a></li>-->
<!--                            </ul>-->
<!--                            <div class="tab-content">-->
<!--                                <div class="tab-pane fade in active" id="googleAuth">-->
<!--                                    <div class="row">-->
<!--                                        <div class="col-md-12 col-sm-12">-->
<!--                                            <div class="form-horizontal">-->
<!--                                                --><?php //$form = ActiveForm::begin([
//                                                    'id' => 'basket-form'
//                                                ]); ?>
<!--                                                <div class="row">-->
<!--                                                    <div class="col-sm-4 col-xs-12">-->
<!--                                                        --><?//= $form->field($address, 'u_name')->label('Имя') ?>
<!--                                                    </div>-->
<!--                                                    <div class="col-sm-4 col-xs-12">-->
<!--                                                        --><?//= $form->field($address, 'u_tel')->label('Телефон') ?>
<!--                                                    </div>-->
<!--                                                    <div class="col-sm-4 col-xs-12">-->
<!--                                                        --><?//= $form->field($address, 'u_email')->label('Email') ?>
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                                <div class="row">-->
<!--                                                    <div class="col-sm-4">-->
<!--                                                        --><?//= $form->field($address, 'u_street')->label('Улица') ?>
<!--                                                    </div>-->
<!--                                                    <div class="col-sm-2">-->
<!--                                                        --><?//= $form->field($address, 'u_house')->label('Дом') ?>
<!--                                                    </div>-->
<!--                                                    <div class="col-sm-2">-->
<!--                                                        --><?//= $form->field($address, 'u_floor')->label('Этаж') ?>
<!--                                                    </div>-->
<!--                                                    <div class="col-sm-2">-->
<!--                                                        --><?//= $form->field($address, 'u_flat')->label('Квартира') ?>
<!--                                                    </div>-->
<!--                                                    <div class="col-sm-2">-->
<!--                                                        --><?//= $form->field($address, 'u_entrance')->label('Парадное') ?>
<!--                                                    </div>-->
<!--                                                </div>-->
<!---->
<!---->
<!--                                                <div class="row">-->
<!--                                                    <div class="col-sm-12">-->
<!--                                                        --><?//= Html::submitButton('Изменить', ['class' => 'main-btn']) ?>
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                                    --><?php //ActiveForm::end(); ?>
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->

                                <div class="tab-pane fade" id="smsAuth">

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</section>