<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Order */
/* @var $form yii\bootstrap\ActiveForm */

$this->title = 'Корзина';
$this->params['breadcrumbs'][] = ['label'=>$this->title,'url'=> ['services'],'class'=>'']
?>
<div class="basket-wrap">
<div class="container">
    <div class="row">
        <div class="col-md-12">

            <div class="panel panel-default tables">
                <div class="panel-heading">
                    <h3 class="panel-title">Ваш заказ</h3>
                </div>
                <div class="table-responsive basket-table">
                    <table class="table">
                        <thead>
                        <tr>
                            <th colspan="2">Название</th>
                            <th>Размер</th>
                            <th>Цена</th>
                            <th>В общем</th>
                            <th>Количество</th>
                        </tr>
                        </thead>
                        <tbody>


                        <?php foreach (Yii::$app->session->get('basket') as $bask_item):?>

                            <tr data-id="<?=$bask_item->item_id?>">
                                <td><?=$bask_item->name?></td>
                                <td><?=$bask_item->img?></td>
                                <td><?=$bask_item->size?> см</td>
                                <td><?=$bask_item->price?> грн</td>
                                <td><?=$bask_item->price*$bask_item->value?> грн</td>
                                <td><?=$bask_item->value?> <span class="close" onclick="deleteBasket(<?=$bask_item->item_id?>);$(this).parents('tr').remove();">x</span></td>
                            </tr>

                        <?php endforeach;?>


                        </tbody>
                    </table>
                </div>

                <div class="form-basket">
            <div>Общая сума: <span id="total_amount"></span> грн</div>


            <?php $form = ActiveForm::begin([
                'id' => 'basket-form'
            ]); ?>

            <div class="row">
                <div class="col-md-4">
                    <?= $form->field($model, 'u_name')->textInput(['value'=>$address->u_name])->label('Имя <span style="color:#ed1c24;">*</span>') ?>
                </div>
                <div class="col-md-4">
                    <?= $form->field($model, 'u_tel')->textInput(['value'=>$address->u_tel])->label('Телефон <span style="color:#ed1c24;">*</span>') ?>
                </div>
                <div class="col-md-4">
                    <?= $form->field($model, 'u_email')->textInput(['value'=>$address->u_email])->label('Email') ?>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <?= $form->field($model, 'u_street')->textInput(['value'=>$address->u_street])->label('Улица <span style="color:#ed1c24;">*</span>') ?>
                </div>
                <div class="col-md-2">
                    <?= $form->field($model, 'u_house')->textInput(['value'=>$address->u_house])->label('Дом <span style="color:#ed1c24;">*</span>') ?>
                </div>
                <div class="col-md-2">
                    <?= $form->field($model, 'u_floor')->textInput(['value'=>$address->u_floor])->label('Этаж') ?>
                </div>
                <div class="col-md-2">
                    <?= $form->field($model, 'u_flat')->textInput(['value'=>$address->u_flat])->label('Квартира') ?>
                </div>
                <div class="col-md-2">
                    <?= $form->field($model, 'u_entrance')->textInput(['value'=>$address->u_entrance])->label('Парадное') ?>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <?= $form->field($model, 'paymant_method')->dropDownList([ 'cash' => 'Наличными', 'by_card' => 'Картой курьеру','online' => 'Онлайн картой' ])->label('Метод оплаты') ?>
                </div>
            </div>


<!--            --><?//= $form->field($model, 'status_pay') ?>
<!--            --><?//= $form->field($model, 'order_status') ?>

            <div class="form-group">
                <?= Html::submitButton('Подвердить заказ', ['class' => 'btn main-btn']) ?>
            </div>
            <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
</div>