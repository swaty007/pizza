<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "address".
 *
 * @property integer $id
 * @property string $u_name
 * @property string $u_tel
 * @property string $u_email
 * @property string $u_street
 * @property string $u_house
 * @property string $u_entrance
 * @property string $u_floor
 * @property string $u_flat
 * @property integer $user_id
 */
class Address extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'address';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id'], 'integer'],
            [['u_name', 'u_tel'], 'string', 'max' => 50],
            [['u_email', 'u_house', 'u_entrance', 'u_floor', 'u_flat'], 'string', 'max' => 60],
            [['u_street'], 'string', 'max' => 100],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'u_name' => 'Имя',
            'u_tel' => 'Телефон',
            'u_email' => 'Email',
            'u_street' => 'Улица',
            'u_house' => 'Дом',
            'u_entrance' => 'Парадное',
            'u_floor' => 'Этаж',
            'u_flat' => 'Квартира',
            'user_id' => 'User ID',
        ];
    }
}
