using { threadtest.db as db } from '../db/schema';

service MyService {
    entity Products as projection on db.Products;
    
    function testWithThread() returns String;
    function testGeneric() returns String;

}