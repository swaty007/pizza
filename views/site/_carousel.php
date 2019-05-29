<?php

use yii\helpers\Html;
?>

<div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
        <li data-target="#myCarousel" data-slide-to="3"></li>
        <li data-target="#myCarousel" data-slide-to="4"></li>
        <li data-target="#myCarousel" data-slide-to="5"></li>
        <li data-target="#myCarousel" data-slide-to="6"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner">
        <a href="/web/images/image2.jpeg" class="item active" data-lightbox="example-1">
            <?php echo Html::img('@web/images/image2.jpeg', ['alt' => 'img']); ?>
            <div class="carousel-caption">
                <!--                                    <h3>Los Angeles</h3>-->
                <!--                                    <p>LA is always so much fun!</p>-->
            </div>
        </a>

        <a href="/web/images/image3.jpeg" class="item" data-lightbox="example-1">
            <?php echo Html::img('@web/images/image3.jpeg', ['alt' => 'img']); ?>
        </a>

        <a href="/web/images/image4.jpeg" class="item" data-lightbox="example-1">
            <?php echo Html::img('@web/images/image4.jpeg', ['alt' => 'img']); ?>
        </a>

        <a href="/web/images/image7.jpeg" class="item" data-lightbox="example-1">
            <?php echo Html::img('@web/images/image7.jpeg', ['alt' => 'img']); ?>
        </a>

        <a href="/web/images/image8.jpeg" class="item" data-lightbox="example-1">
            <?php echo Html::img('@web/images/image8.jpeg', ['alt' => 'img']); ?>
        </a>

        <a href="/web/images/image9.jpeg" class="item" data-lightbox="example-1">
            <?php echo Html::img('@web/images/image9.jpeg', ['alt' => 'img']); ?>
        </a>

        <a href="/web/images/image10.jpeg" class="item" data-lightbox="example-1">
            <?php echo Html::img('@web/images/image10.jpeg', ['alt' => 'img']); ?>
        </a>

    </div>

    <style>.carousel-inner a {max-height: 90vh}</style>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>
    </a>
</div>