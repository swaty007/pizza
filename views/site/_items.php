<div class="main-block">
    <div class="container">
        <div class="row">
            <div class="col-sm-3">
                <div id="filter_items">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>КАТЕГОРИИ ПРОДУКТОВ</h3>
                            <div id="type_filter">
                                <ul class="main-nav tabs">
                                    <?php foreach ($items_type as $k=>$items): ?>
                                        <li class="checkbox">
                                            <!--                                            <label class="form-check-label">-->
                                            <!--                                                <input type="checkbox" value="--><?//=$k?><!--">-->
                                            <!--                                                --><?//=$k?><!-- </label>-->
                                            <a class="scroll" href="#<?=$k?>"><?=$k?></a>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<pre>--><?php //var_dump($items_type['popular']) ?><!--</pre>-->
            <div class="col-sm-9">
                <?php foreach ($items_type as $k=>$items): ?>
                    <h2><?=$k?></h2>
                    <div id="<?=$k?>" class="item-wrap">
                        <div class="row">
                            <?php foreach ($items as $item): ?>
                                <div class="col-md-4 col-sm-6 col-xs-12">
                                    <div class="item-block" data-type="<?= $item['type'] ?>">
                                        <div class="img-block">
                                            <img src="/web<?= $item['img'] ?>" alt="<?= $item['name'] ?>">
                                        </div>
                                        <h3><?= $item['name'] ?></h3>
                                        <div data-name="<?= $item['name'] ?>" class="price-wrap">
                                            <div class="col-xs-12">
                                                <div class="row">
                                                    <?php if( $item['ingredients'] ):?>
                                                        <div class="sostav-block">
                                                            <div class="col-xs-3 text-right"><span class="title">Состав:</span></div>
                                                            <div class="col-xs-9 text-left"><span class="desc-i"><?= $item['ingredients'] ?></span></div>
                                                        </div>
                                                    <?php endif;?>
                                                </div>
                                                <div class="row price-block" data-id="<?= $item['id'] ?>">
                                                    <div class="size col-xs-2">
                                                        <?php if( $item['size'] ):?>
                                                            <span><?= $item['size'] ?> см</span>
                                                        <?php endif;?>
                                                    </div>
                                                    <div class="weight col-xs-3">
                                                        <?php if( $item['weight'] ):?>
                                                            <span><?= $item['weight'] ?> г.</span>
                                                        <?php endif;?>
                                                    </div>
                                                    <div class="price col-xs-4">
                                                        <span><?= $item['price'] ?> Грн</span>
                                                    </div>
                                                    <button data-price="<?= $item['price'] ?>"
                                                            data-id="<?= $item['id'] ?>"
                                                            data-size="<?= $item['size'] ?>"
                                                            onclick="setBasket(this)"
                                                            class="col-xs-3 btn btn-danger btn-xs">Заказать
                                                    </button>
                                                </div>
                                                <?php foreach ($item['child'] as $child): ?>
                                                    <div class="row price-block">
                                                        <div class="col-xs-2 size">
                                                            <?php if( $item['size'] ):?>
                                                                <span><?= $item['size'] ?> см</span>
                                                            <?php endif;?>
                                                        </div>
                                                        <div class="col-xs-3 weight">
                                                            <?php if( $item['weight'] ):?>
                                                                <span><?= $item['weight'] ?> г.</span>
                                                            <?php endif;?>
                                                        </div>
                                                        <div class="col-xs-4 price">
                                                            <span><?= $child['price'] ?> Грн</span>
                                                        </div>
                                                        <button data-price="<?= $child['price'] ?>"
                                                                data-id="<?= $child['id'] ?>"
                                                                data-size="<?= $child['size'] ?>"
                                                                onclick="setBasket(this)"
                                                                class="col-xs-3 btn btn-danger btn-xs">Заказать
                                                        </button>
                                                    </div>
                                                <? endforeach; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <? endforeach; ?>
                        </div>
                    </div>
                <? endforeach; ?>
            </div>
        </div>
    </div>
</div>