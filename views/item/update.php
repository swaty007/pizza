<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Item */

$this->title = 'Update Item: ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Items', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="item-update">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><?= Html::encode($this->title) ?></h1>

                <?= $this->render('_form', [
                    'model' => $model,
                ]) ?>

                <div id="child-block" class="child-block">
                    <?php foreach ($model_child as $item): ?>
                        <div class="item-children">
                            <div class="form-group field-item-price">
                                <label class="control-label">Price</label>
                                <input type="text" class="form-control" value="<?= $item->price ?>">
                            </div>
                            <div class="form-group field-item-size">
                                <label class="control-label">Size</label>
                                <input type="text" class="form-control" value="<?= $item->size ?>">
                            </div>
                            <div class="form-group field-item-weight">
                                <label class="control-label">Weight</label>
                                <input type="text" class="form-control" value="<?= $item->weight ?>">
                            </div>
                            <button onclick="updateChildren(this, <?=$model->id;?>, <?= $item->id ?>)" class="btn btn-primary btn-update-child">
                                Обновить размер
                            </button>
                            <button onclick="deleteChildren(this, <?= $item->id ?> )" class="btn btn-primary">
                                Удалить размер
                            </button>
                        </div>
                    <?php endforeach; ?>

                </div>

                <button id="add-children" class="btn btn-success" style="margin-top:20px;margin-bottom:20px;">Добавить размер</button>

                <script>
                    function addChildren(__this, id) {
                        var _this = $(__this);
                        var submitBtn = _this;
                        var price = _this.siblings('.field-item-price').find('input').val();
                        var size = _this.siblings('.field-item-size').find('input').val();
                        var weight = _this.siblings('.field-item-weight').find('input').val();
                        submitBtn.attr('disabled', 'disabled');//выключить повторное нажатие
                        var data = {
                            price: price,
                            size: size,
                            weight: weight,
                            id: id
                        };
                        $.ajax({
                            type: 'POST',
                            url: '/web/item/add-children',
                            data: data,
                            success: function (res) {
                                console.log(res);
                                if (res.status == true) {
                                    res.item.price
                                    res.item.weight
                                    res.item.id
                                    submitBtn.after('<button onclick="deleteChildren(this, ' + res.item.id + ' )" class="btn btn-primary">Удалить размер</button>');
                                    submitBtn.after('<button onclick="updateChildren(this, ' + res.item.id + ',' + res.item.parent_id + ' )" class="btn btn-primary btn-update-child">Обновить размер</button>');
                                    submitBtn.remove();
                                }
                                if (res.status == false) {

                                }
                            }
                        }).always(function () {
                            submitBtn.removeAttr('disabled'); //включить кнопку
                        });
                    }
                    function updateChildren(__this, parent_id, id) {
                        var _this = $(__this);
                        var submitBtn = _this;
                        var price = _this.siblings('.field-item-price').find('input').val();
                        var size = _this.siblings('.field-item-size').find('input').val();
                        var weight = _this.siblings('.field-item-weight').find('input').val();
                        submitBtn.attr('disabled', 'disabled');//выключить повторное нажатие
                        var data = {
                            price: price,
                            size: size,
                            weight: weight,
                            id: id,
                            parent_id: parent_id
                        };
                        $.ajax({
                            type: 'POST',
                            url: '/web/item/update-children',
                            data: data,
                            success: function (res) {
                                console.log(res);
                                if (res.status == true) {
                                    res.item.price
                                    res.item.weight
                                    res.item.id
//                                    submitBtn.after('<button onclick="deleteChildren(this, ' + res.item.id + ' )" class="btn btn-primary">Delete children</button>');
//                                    submitBtn.remove();
                                }
                                if (res.status == false) {

                                }
                            }
                        }).always(function () {
                            submitBtn.removeAttr('disabled'); //включить кнопку
                        });
                    }
                    function deleteChildren(__this, id) {
                        var _this = $(__this);
                        var submitBtn = _this;
                        submitBtn.attr('disabled', 'disabled');//выключить повторное нажатие
                        var data = {
                            id: id
                        };
                        $.ajax({
                            type: 'POST',
                            url: '/web/item/delete-children',
                            data: data,
                            success: function (res) {
                                console.log(res);
                                if (res.status == true) {
                                    submitBtn.parent('.item-children').remove();
                                }
                                if (res.status == false) {

                                }
                            }
                        }).always(function () {
                            submitBtn.removeAttr('disabled'); //включить кнопку
                        });

                    }
                    document.addEventListener("DOMContentLoaded", function () {

                        var item = '<div class="item-children"><div class="form-group field-item-price"><label class="control-label">Цена</label><input type="text" class="form-control" ></div><div class="form-group field-item-size"><label class="control-label">Размер</label><input type="text" class="form-control" ></div><div class="form-group field-item-weight"><label class="control-label">Вес</label><input type="text" class="form-control" ></div><button onclick="addChildren(this, <?=$model->id;?>)" class="btn btn-primary">Сохранить размер</button></div>';

                        $('#add-children').on('click', function () {
                            $('#child-block').append(item)
                        });

                        $('#btn-update-children-elements').on('click', function (e) {
                            e.preventDefault();
                            $('.btn-update-child').click();
                            this.form.submit();
                        });

                    });
                </script>

            </div>
        </div>
    </div>
</div>
