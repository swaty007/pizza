<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model app\models\ContactForm */

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use yii\captcha\Captcha;

$this->title = 'Контакты';
$this->params['breadcrumbs'][] = ['label'=>$this->title,'url'=> ['services'],'class'=>'']
?>


<div class="contact-page">

    <div class="container">
        <h1 class="text-center"><?= Html::encode($this->title) ?></h1>
        <div class="row">

            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12">
                        <div class="contact-block">
                            <i class="fa fa-envelope-o"></i>
                            <span>Email: <a href="mailto:<?=Yii::$app->params['adminEmail']?>"><?=Yii::$app->params['adminEmail']?></a></span>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="contact-block">
                            <i class="fa fa-phone"></i>
                            <span>Телефон: <a href="tel:380938449020"><?=Yii::$app->params['telephone']?></a></span>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="contact-block">
                            <i class="fa fa-home"></i>
                            <span class="title">Адресс:  <span class="text">Киев, Соломенский район, Микрорайон «Турецкий городок», Ул. Фёдор Эрнста 16в, «Жили были»</span></span>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="contact-block">
                            <i class="fa fa-clock-o"></i>
                            <span class="title">Режим работы:  <span class="text">11:00 - 20:00</span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">

                <?php if (Yii::$app->session->hasFlash('contactFormSubmitted')): ?>
                    <div class="alert alert-success">
                        Дякуємо за то зв'язалися з нами. Ми відповімо Вам найближчим часом.
                    </div>
                <?php endif; ?>

                <?php $form = ActiveForm::begin(['id' => 'contact-form']); ?>

                <?//= $form->field($model, 'name')->textInput(['autofocus' => true])->label('Iм`я') ?>

                <?= $form->field($model, 'name')->textInput()->label('Имя') ?>

                <?= $form->field($model, 'email') ?>

                <?= $form->field($model, 'telephone')->label('Телефон') ?>

                <?= $form->field($model, 'body')->textarea(['rows' => 6,'placeholder' => 'Необязательно'])->label('Сообщение') ?>

                <?=$form->field($model, 'hidden')->hiddenInput(['value' => 'Страницы контакт'])->label(false);?>

                <?//= $form->field($model, 'verifyCode')->widget(Captcha::className(), [

                //    'template' => '<div class="row"><div class="col-lg-3">{image}</div><div class="col-lg-6">{input}</div></div>',

                //]) ?>

                <div class="form-group">
                    <?= Html::submitButton('Подтвердить', ['class' => 'btn btn-primary button-alex', 'name' => 'contact-button']) ?>
                </div>
                <?php ActiveForm::end(); ?>

            </div>
        </div>
    </div>


    <div class="google-map">
        <!--         <div class="container">-->
        <!--             <div class="col-md-12">-->
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1797.7236515473155!2d30.45993275401045!3d50.41566763335002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cecadda57875%3A0xbbed56dd79999abc!2z0LLRg9C70LjRhtGPINCk0LXQtNC-0YDQsCDQldGA0L3RgdGC0LAsIDE2LCDQmtC40ZfQsiwgMDIwMDA!5e0!3m2!1sru!2sua!4v1519942403049" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>
        <!--             </div>-->
        <!--         </div>-->
    </div>
</div>