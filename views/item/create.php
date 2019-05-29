<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\Item */

$this->title = 'Create Item';
$this->params['breadcrumbs'][] = ['label' => 'Items', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="item-create">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
</div>
</div>
</div>
