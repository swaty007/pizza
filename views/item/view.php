<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $model app\models\Item */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Items', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="item-view">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Обновить', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Удалить', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            'name',
//            'img',
            [
                'label' => 'Картинка',
                'format' => 'raw',
                'value' => function($data){
                    return Html::img(Url::toRoute($data->img),[
                        'alt'=>"img_$data->name",
                        'style' => 'max-width:300px;width: 100%;'
                    ]);
                },
            ],
            'price',
            'size',
            'ingredients:ntext',
            'weight',
            'type',
            'parent_id',
        ],
    ]) ?>
    <?php if($model_child):?>
    <table class="table table-bordered table-striped">
        <tbody>
    <?php foreach ($model_child as $item):?>


<!--            <tr><th>ID</th><td>--><?//=$item->id?><!--</td></tr>-->
            <tr style="background: black;"><th>0</th><td>0</td></tr>
            <tr><th>Цена</th><td><?=$item->price?></td></tr>
            <tr><th>Размер</th><td><?=$item->size?></td></tr>
            <tr><th>Вес</th><td><?=$item->weight?></td></tr>
<!--            <tr><th>Type</th><td>--><?//=$item->type?><!--</td></tr>-->
<!--            <tr><th>Parent ID</th><td>--><?//=$item->parent_id?><!--</td></tr>-->
    <?php endforeach;?>
            </tbody>
        </table>
    <?php endif;?>
</div>
</div>
</div>
</div>
