<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'Про нас';
$this->params['breadcrumbs'][] = ['label'=>$this->title,'url'=> ['services'],'class'=>'']
?>

 <div class="site-about">
      <div class="container">
           <div class="row">
                <div class="col-md-12">
                    <h1><?= Html::encode($this->title) ?></h1>

                    <?php echo Html::img('@web/images/logo.png', ['alt' => 'logo','class'=>'logo']); ?>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="contact-block">
                                <i class="fa fa-envelope-o"></i>
                                <span>Email: <a href="mailto:<?=Yii::$app->params['adminEmail']?>"><?=Yii::$app->params['adminEmail']?></a></span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contact-block">
                                <i class="fa fa-phone"></i>
                                <span>Телефон: <a href="tel:380938449020"><?=Yii::$app->params['telephone']?></a></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="contact-block">
                                <i class="fa fa-home"></i>
                                <span class="title">Адресс:  <span class="text">Киев, Соломенский район, Микрорайон «Турецкий городок», Ул. Фёдор Эрнста 16в, «Жили были»</span></span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contact-block">
                                <i class="fa fa-clock-o"></i>
                                <span class="title">Режим работы:  <span class="text">11:00 - 20:00</span></span>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
      </div>


     <!--     <div class="container">-->
     <!--         <div class="row">-->
     <!--             <div class="col-md-12">-->
     <?= $this->render('_carousel') ?>
     <!--             </div>-->
     <!--         </div>-->
     <!--     </div>-->

     <div class="google-map">
<!--         <div class="container">-->
<!--             <div class="col-md-12">-->
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1797.7236515473155!2d30.45993275401045!3d50.41566763335002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cecadda57875%3A0xbbed56dd79999abc!2z0LLRg9C70LjRhtGPINCk0LXQtNC-0YDQsCDQldGA0L3RgdGC0LAsIDE2LCDQmtC40ZfQsiwgMDIwMDA!5e0!3m2!1sru!2sua!4v1519942403049" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>
<!--             </div>-->
<!--         </div>-->
     </div>





 </div>