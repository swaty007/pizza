<?php

use yii\helpers\Html;
use yii\helpers\Url;
?>

<link rel="stylesheet" href="http://pizza.infinitum.tech/web/gallery/css/blueimp-gallery.min.css">
<link rel="stylesheet" href="http://pizza.infinitum.tech/web/gallery/css/blueimp-gallery-indicator.css">
<link rel="stylesheet" href="http://pizza.infinitum.tech/web/gallery/css/blueimp-gallery-video.css">


<h2> image gallery</h2>
<div id="links" class="links">
    <a href="http://pizza.infinitum.tech/web/images/image2.jpeg" title="Chinatown" data-gallery><?php echo Html::img('@web/images/image2.jpeg', ['alt' => 'img']); ?></a>
    <a href="http://pizza.infinitum.tech/web/images/image3.jpeg" title="Chinatown" data-gallery><?php echo Html::img('@web/images/image3.jpeg', ['alt' => 'img']); ?></a>
    <a href="http://pizza.infinitum.tech/web/images/image4.jpeg" title="Chinatown" data-gallery><?php echo Html::img('@web/images/image4.jpeg', ['alt' => 'img']); ?></a>
    <a href="http://pizza.infinitum.tech/web/images/image7.jpeg" title="Chinatown" data-gallery><?php echo Html::img('@web/images/image7.jpeg', ['alt' => 'img']); ?></a>
    <a href="http://pizza.infinitum.tech/web/images/image8.jpeg" title="Chinatown" data-gallery><?php echo Html::img('@web/images/image8.jpeg', ['alt' => 'img']); ?></a>
    <a href="http://pizza.infinitum.tech/web/images/image9.jpeg" title="Chinatown" data-gallery><?php echo Html::img('@web/images/image9.jpeg', ['alt' => 'img']); ?></a>
    <a href="http://pizza.infinitum.tech/web/images/image10.jpeg" title="Chinatown" data-gallery><?php echo Html::img('@web/images/image10.jpeg', ['alt' => 'img']); ?></a>
</div>

<div id="blueimp-gallery" class="blueimp-gallery">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
<style>
    .links {
        text-align: center;
    }
    .links a {
        width: 300px;
        display: inline-block;
    }
    .links img {
        width: 100%;
    }
    @media (min-width: 481px) {
        .navigation {
            list-style: none;
            padding: 0;
        }
        .navigation li {
            display: inline-block;
        }
        .navigation li:not(:first-child):before {
            content: '| ';
        }
    }
</style>

<script src="http://pizza.infinitum.tech/web/gallery/js/blueimp-helper.js"></script>
<script src="http://pizza.infinitum.tech/web/gallery/js/blueimp-gallery.js"></script>
<!--<script src="http://pizza.infinitum.tech/web/gallery/js/blueimp-gallery-fullscreen.js"></script>-->
<!--<script src="http://pizza.infinitum.tech/web/gallery/js/blueimp-gallery-indicator.js"></script>-->
<!--<script src="http://pizza.infinitum.tech/web/gallery/js/blueimp-gallery-video.js"></script>-->
<!--<script src="http://pizza.infinitum.tech/web/gallery/js/blueimp-gallery-vimeo.js"></script>-->
<!--<script src="http://pizza.infinitum.tech/web/gallery/js/blueimp-gallery-youtube.js"></script>-->
<script src="http://pizza.infinitum.tech/web/gallery/js/vendor/jquery.js"></script>
<script src="http://pizza.infinitum.tech/web/gallery/js/jquery.blueimp-gallery.js"></script>