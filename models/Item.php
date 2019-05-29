<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "item".
 *
 * @property integer $id
 * @property string $name
 * @property string $img
 * @property integer $price
 * @property integer $size
 * @property string $ingredients
 * @property integer $weight
 * @property string $type
 * @property integer $parent_id
 */
class Item extends \yii\db\ActiveRecord
{
    public $upload;
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'item';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [[ 'weight', 'parent_id'], 'integer'],
            [['price'], 'number'],
            [['type'], 'string'],
//            [['name', 'img'], 'string', 'max' => 150],
            [['name'], 'string', 'max' => 150],
            [['ingredients','size'], 'string', 'max' => 500],
            [['upload'], 'file', 'extensions' => 'png, jpg'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Название',
            'img' => 'Img',
            'price' => 'Цена',
            'size' => 'Размер',
            'ingredients' => 'Ингредиенты',
            'weight' => 'Вес',
            'type' => 'Тип',
            'parent_id' => 'Parent ID',
        ];
    }
    public static function takeItems()
    {
        $items = [];
        foreach (Item::find()->all() as $i)
        {
            $items[$i->id] = $i;
        }
        return $items;
    }
}
