<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Item */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="item-form">

    <?php $form = ActiveForm::begin([
        'id' => 'item-form'
    ]); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

<!--    --><?//= $form->field($model, 'img')->textInput(['maxlength' => true]) ?>
    <div class="row">
        <div class="col-md-6">
            <?= $form->field($model, 'upload')->fileInput() ?>
        </div>
        <div class="col-md-6">
            <img src="/web<?= $model->img?>" alt="" style="max-width:300px;width: 100%;max-height: 200px;object-fit: contain;">
        </div>
    </div>

    <?= $form->field($model, 'price')->textInput() ?>

    <?= $form->field($model, 'size')->textInput() ?>

    <?= $form->field($model, 'ingredients')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'weight')->textInput() ?>

    <?= $form->field($model, 'type')->dropDownList([ 'pizza' => 'Пицца', 'single' => 'Одиночный товар','drink' => 'Напитки', 'souse' => 'Соусы', 'salad' => 'Салаты', ], ['prompt' => '']) ?>

<!--    --><?//= $form->field($model, 'parent_id')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? 'Создать' : 'Обновить', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary',
            'id' => $model->isNewRecord ? '' : 'btn-update-children-elements'
        ]) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
