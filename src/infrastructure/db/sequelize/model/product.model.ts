import { Table, Model, PrimaryKey, Column } from "sequelize-typescript";

@Table({
  tableName: "products",
  modelName: "Product",
  timestamps: false,  
})
export default class ProductModel extends Model {
  
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
