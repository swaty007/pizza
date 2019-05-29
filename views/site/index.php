<?php

/* @var $this yii\web\View */

$this->title = 'Жили были';
?>

<?= $this->render('_items',['items_type'=>$items_type]) ?>



    <div class="container">
        <div class="row">

<!--                --><?//= $this->render('_gallery') ?>

            <div class="col-md-12">
                <?= $this->render('_carousel') ?>
            </div>
        </div>
    </div>
