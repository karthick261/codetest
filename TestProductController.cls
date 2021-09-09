@isTest
public class TestProductController {
    @testSetup
    static void createProducts() {
        List<Product__c> products = new List<Product__c>();

        products.add(
            new Product__c(
                Name = 'Sample Bike 1',
                MSRP__c = 1000,
                Category__c = 'Mountain',
                Level__c = 'Beginner',
                Material__c = 'Carbon',
                Frame_Color__c = 'red'
            )
        );

        products.add(
            new Product__c(
                Name = 'Sample Bike 2',
                MSRP__c = 1200,
                Category__c = 'Mountain',
                Level__c = 'Beginner',
                Material__c = 'Carbon',
                Frame_Color__c = 'red'
            )
        );

        insert products;
    }

    @isTest
    static void testGetProducts() {
        ProductController.Filters filters = new ProductController.Filters();
        filters.searchKey = 'Sample';
        filters.maxPrice = 2000;
        filters.categories = new List<String>{ 'Mountain' };
        filters.levels = new List<String>{ 'Beginner' };
        filters.materials = new List<String>{ 'Carbon' };
        filters.frames = new List<String>{ 'red' };
        PagedResult result = ProductController.getProducts(filters, 1,9);
        System.assertEquals(result.records.size(), 2);
    }

    @isTest
    static void testGetSimilarProducts() {
        ProductController.Filters filters = new ProductController.Filters();
        filters.searchKey = 'Sample';
        filters.maxPrice = 2000;
        filters.categories = new List<String>{ 'Mountain' };
        filters.levels = new List<String>{ 'Beginner' };
        filters.materials = new List<String>{ 'Carbon' };
        filters.frames = new List<String>{ 'red' };
        PagedResult result = ProductController.getProducts(filters, 1,9);
        Product__c productToCompare = (Product__c) result.records[0];
        Product__c[] products = ProductController.getSimilarProducts(
            productToCompare.Id,
            null
        );
        System.assertEquals(products.size(), 1);
    }
}