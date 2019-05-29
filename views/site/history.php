
<?php
use yii\helpers\Html;
use yii\helpers\Url;
/* @var $this yii\web\View */

$this->title = 'История заказов';
$this->params['breadcrumbs'][] = ['label'=>$this->title,'url'=> ['services'],'class'=>'']
?>



<section id="history-block" class="history-block">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><?= Html::encode($this->title) ?></h1>


                <div class="table-responsive history-table">
                    <table class="table table-striped table-hover table-condensed balance-table">
                        <thead>
                        <tr>
                            <th>Состояние оплаты</th>
                            <th>Статус заказа</th>
                            <th>Метод оплаты</th>
                            <th>Общая цена</th>
                            <th colspan="2">Подробнее</th>
                        </tr>
                        </thead>
                        <tbody>

                        <?php foreach ($orders as $item):?>
                            <tr class="<?php
                            if ($item['order_status'] == 'new') {echo 'success';}
                            else if ($item['order_status'] == 'in_progress') {echo 'info';}
                            else if ($item['order_status'] == 'canceled') {echo 'warning';}
                            else if ($item['order_status'] == 'completed') {echo 'success';} ?>">
                                <td><?php if($item['status_pay'] === '100'){echo 'Оплаченно картой';}
                                    else if($item['status_pay'] === '0'){echo 'Не оплачено';} ?></td>
                                <td>
                                    <?php if($item['order_status'] === 'new'){echo 'Новый';}
                                    else if($item['order_status'] === 'in_progress'){echo 'В процессе';}
                                    else if($item['order_status'] === 'completed'){echo 'Выполнен';}
                                    else if($item['order_status'] === 'canceled'){echo 'Отменен';} ?>
                                </td>
                                <td><?php if($item['paymant_method'] === 'cash'){echo 'Наличными';}
                                    else if($item['paymant_method'] === 'by_card'){echo 'Картой курьеру';}
                                    else if($item['paymant_method'] === 'online'){echo 'Онлайн картой';} ?></td>
                                <td><?=$item['total_price'];?></td>
                                <td>
                                    <a class="detailBtn" href="#">Подробнее</a>
                                </td>
                            </tr>

                            <tr class="details">
                                <td colspan="5">
                                    <div class="details" >

                                            <h2 class="col-md-12 info-title">Состав заказа</h2>
                                            <?php foreach ($item['items'] as $i):?>
                                        <div class="col-md-6">
                                                <div class="items">
                                                    <p class="info-details">Название : <span><?=$items[$i['item_id']]->name?></span></p>
                                                    <p class="info-details">Цена : <span><?=$items[$i['item_id']]->price?></span></p>
                                                    <p class="info-details">Размер : <span><?=$items[$i['item_id']]->size?></span></p>
                                                    <p class="info-details">Количество : <span><?=$i['value'];?></span></p>
                                                </div>
                                        </div>
                                            <?php endforeach; ?>
<!--                                        <div class="col-md-6">-->
<!--                                            <h2 class="info-title">Данные пользователя</h2>-->
<!--                                            <p class="info-details">Имя : <span>--><?//=$item['u_name'];?><!--</span></p>-->
<!--                                            <p class="info-details">Телефон : <span>--><?//=$item['u_tel'];?><!--</span></p>-->
<!--                                            <p class="info-details">Улица : <span>--><?//=$item['u_street'];?><!--</span></p>-->
<!--                                            <div class="row">-->
<!--                                                <div class="col-md-6">-->
<!--                                                    <p class="info-details">Дом : <span>--><?//=$item['u_house'];?><!--</span></p>-->
<!--                                                </div>-->
<!--                                                <div class="col-md-6">-->
<!--                                                    <p class="info-details">Парадное : <span>--><?//=$item['u_entrance'];?><!--</span></p>-->
<!--                                                </div>-->
<!--                                                <div class="col-md-6">-->
<!--                                                    <p class="info-details">Этаж : <span>--><?//=$item['u_floor'];?><!--</span></p>-->
<!--                                                </div>-->
<!--                                                <div class="col-md-6">-->
<!--                                                    <p class="info-details">Квартира : <span>--><?//=$item['u_flat'];?><!--</span></p>-->
<!--                                                </div>-->
<!--                                            </div>-->
<!--                                        </div>-->
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        <script>
                            document.addEventListener("DOMContentLoaded", function () {

                                var hideAll = function () {
                                    $('.history-table table').find('.details').slideUp();
                                };
                                hideAll();
                                $('.history-table table a.detailBtn').on('click',function (e) {
                                    e.preventDefault();
                                    var n = $(this).parents('tr').index();
                                    if ($(this).parents('tbody').children('tr').eq(n+1).is(':hidden')) {
                                        hideAll();
                                    }
                                    $(this).parents('tbody').children('tr').eq(n+1).slideToggle(300).find('div.details').slideToggle(300);
                                });
                            });
                        </script>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</section>