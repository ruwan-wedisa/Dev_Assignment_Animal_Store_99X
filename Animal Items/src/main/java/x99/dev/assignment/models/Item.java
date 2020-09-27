package x99.dev.assignment.models;

import javax.persistence.*;

@Entity
@Table(name = "animal_items")
public class Item {

    public Item() {
    }

    public Item(Long id,String itemName, Integer noOfUnitsInCartoon, Double priceOFSingleCartoon, String imageUrl, Double increasedPrecentage, Double discountPrecentage, Integer minCartoonAmountToDiscount) {
        this.id = id;
        this.itemName = itemName;
        this.noOfUnitsInCartoon = noOfUnitsInCartoon;
        this.priceOFSingleCartoon = priceOFSingleCartoon;
        this.imageUrl = imageUrl;
        this.increasedPrecentage = increasedPrecentage;
        this.discountPrecentage = discountPrecentage;
        this.minCartoonAmountToDiscount = minCartoonAmountToDiscount;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "cartoon_units", nullable = false)
    private Integer noOfUnitsInCartoon;

    @Column(name = "cartoon_price", nullable = false)
    private Double priceOFSingleCartoon;

    @Column(name = "image_url", length=50000)
    private String imageUrl;

    @Column(name = "adding_precentage")
    private Double increasedPrecentage = 0.3;

    @Column(name = "discount_precentage")
    private Double discountPrecentage = 0.1;

    @Column(name = "discount_margin")
    private Integer minCartoonAmountToDiscount = 3;

    private Integer numberOfCartoons = 0;


    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getMinCartoonAmountToDiscount() {
        return minCartoonAmountToDiscount;
    }

    public void setMinCartoonAmountToDiscount(Integer minCartoonAmountToDiscount) {
        this.minCartoonAmountToDiscount = minCartoonAmountToDiscount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNoOfUnitsInCartoon() {
        return noOfUnitsInCartoon;
    }

    public void setNoOfUnitsInCartoon(Integer noOfUnitsInCartoon) {
        this.noOfUnitsInCartoon = noOfUnitsInCartoon;
    }

    public Double getPriceOFSingleCartoon() {
        return priceOFSingleCartoon;
    }

    public void setPriceOFSingleCartoon(Double priceOFSingleCartoon) {
        this.priceOFSingleCartoon = priceOFSingleCartoon;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getIncreasedPrecentage() {
        return increasedPrecentage;
    }

    public void setIncreasedPrecentage(Double increasedPrecentage) {
        this.increasedPrecentage = increasedPrecentage;
    }

    public Double getDiscountPrecentage() {
        return discountPrecentage;
    }

    public void setDiscountPrecentage(Double discountPrecentage) {
        this.discountPrecentage = discountPrecentage;
    }

    public Double calculateSingleUnitPrice() {
        return (this.priceOFSingleCartoon / this.noOfUnitsInCartoon) + (this.priceOFSingleCartoon / this.noOfUnitsInCartoon * this.increasedPrecentage);
    }
}
