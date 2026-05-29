import Datastore from "nedb-promises";

class Menu {
  constructor(menuFilePath) {
    console.log(menuFilePath);
    this.menu = menuFilePath
      ? Datastore.create({ filename: menuFilePath, autoload: true })
      : Datastore.create();
  }

  async init() {
    const items = [
      {
        id: "1",
        name: "carrot cake",
        description: "home made here",
        price: "2.50",
        category: "cake",
        available: "no",
        url: "http://localhost:3001/images/1.jpg",
      },
      {
        id: "2",
        name: "sandwiches",
        description: "with a variety of fillings",
        price: "2.50",
        category: "snack",
        available: "no",
        url: "http://localhost:3001/images/2.jpg",
      },
      {
        id: "3",
        name: "salad",
        description: "uses seasonal local produce",
        price: "3.50",
        category: "side",
        available: "yes",
        url: "http://localhost:3001/images/3.jpg",
      },
      {
        id: "4",
        name: "hot chocolate",
        description: "with fully fat or skimmed milk",
        price: "2.00",
        category: "drinks",
        available: "yes",
        url: "http://localhost:3001/images/4.jpg",
      },
      {
        id: "5",
        name: "chocolate cake",
        description: "with cream",
        price: "2.50",
        category: "cake",
        available: "yes",
        url: "http://localhost:3001/images/5.jpg",
      },
      {
        id: "6",
        name: "soup",
        description: "ask for soups available today",
        price: "2.00",
        category: "snack",
        available: "yes",
        url: "http://localhost:3001/images/6.jpg",
      },
      {
        id: "7",
        name: "pizza",
        description: "ham and pineapple or four cheese",
        price: "5.00",
        category: "main",
        available: "yes",
        url: "http://localhost:3001/images/7.jpg",
      },
      {
        id: "8",
        name: "baked potato",
        description: "with cheese, coleslaw, beans or tuna",
        price: "4.50",
        category: "main",
        available: "yes",
        url: "http://localhost:3001/images/8.jpg",
      },
      {
        id: "9",
        name: "apple pie",
        description: "with cream or custard",
        price: "3.50",
        category: "pudding",
        available: "yes",
        url: "http://localhost:3001/images/9.jpg",
      },
      {
        id: "10",
        name: "cheesecake",
        description: "with cream",
        price: "3.00",
        category: "pudding",
        available: "yes",
        url: "http://localhost:3001/images/10.jpg",
      },
      {
        id: "11",
        name: "fish and chips",
        description: "locally caught ",
        price: "6.50",
        category: "main",
        available: "yes",
        url: "http://localhost:3001/images/11.jpg",
      },
      {
        id: "12",
        name: "lasagne",
        description: "with chips or garlic bread",
        price: "6.50",
        category: "main",
        available: "yes",
        url: "http://localhost:3001/images/12.jpg",
      },
      {
        id: "13",
        name: "ice cream",
        description: "various flavours",
        price: "2.50",
        category: "pudding",
        available: "yes",
        url: "http://localhost:3001/images/13.jpg",
      },
      {
        id: "14",
        name: "coffee",
        description: "freshly ground",
        price: "1.50",
        category: "drinks",
        available: "yes",
        url: "http://localhost:3001/images/14.jpg",
      },
      {
        id: "15",
        name: "tea",
        description: "a range of varieties",
        price: "1",
        category: "drinks",
        available: "yes",
        url: "http://localhost:3001/images/15.jpg",
      },
      {
        id: "16",
        name: "pasta",
        description: "with a tomato and garlic sauce",
        price: "5.50",
        category: "main",
        available: "yes",
        url: "http://localhost:3001/images/16.jpg",
      },
      {
        id: "17",
        name: "chips",
        description: "with ketchup or mayonnaise",
        price: "3",
        category: "side",
        available: "yes",
        url: "http://localhost:3001/images/17.jpg",
      },
      {
        id: "18",
        name: "sparkling mineral water",
        description: "locally sourced",
        price: "1.5",
        category: "drinks",
        available: "yes",
        url: "http://localhost:3001/images/18.jpg",
      },
    ];
    await this.menu.insert(items);
  }

  async getAllEntries() {
    try {
      const entries = await this.menu.find({});
      console.log("function all() returns: ", entries);
      return entries;
    } catch (err) {
      throw err;
    }
  }
}

export default Menu;
