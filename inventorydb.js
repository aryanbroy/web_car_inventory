const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function categoryCreate(index, name, description, url){
    const category = new Category({
        name: name,
        description: description,
        url: url,
    });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function itemCreate(index, item_name, item_desc, item_category, price, number_in_stock, item_url){
    const itemDetail = {
        item_name: item_name,
        item_desc: item_desc,
        item_category: item_category,
        price: price,
        number_in_stock: number_in_stock,
        item_url: item_url,
    }

    const item = new Item(itemDetail);
    await item.save();
    items[index] = item;
    console.log(`Added item ${item_name}`);
}

async function createCategories(){
    console.log("Adding categories");
    await Promise.all([
        categoryCreate(
            0,
            "Sedans",
            "Sedans are one of the most popular categories globally. They offer a balance of comfort, affordability, and practicality, making them suitable for families, commuters, and business users.",
            "https://en.wikipedia.org/wiki/Sedan_(automobile)"
        ),
        categoryCreate(
            1,
            "SUVs",
            "SUVs have seen a surge in popularity in recent years, becoming one of the fastest-growing segments in many markets. Their versatility, higher seating position, and ample cargo space appeal to families, outdoor enthusiasts, and urban commuters alike.",
            "https://en.wikipedia.org/wiki/SUV"
        ),
        categoryCreate(
            2,
            "Hatchbacks",
            "Hatchbacks are popular for their compact size, fuel efficiency, and versatility. They are often preferred by urban dwellers and younger drivers looking for practicality and style in a smaller package.",
            "https://en.wikipedia.org/wiki/Hatchback"
        ),
        categoryCreate(
            3,
            "Pickup Trucks",
            "Pickup trucks are immensely popular in certain regions, particularly in North America, where they are commonly used for work, recreation, and daily commuting. Their ruggedness, towing capabilities, and versatility make them a staple in many households.",
            "https://en.wikipedia.org/wiki/Pickup_truck"
        ),
        categoryCreate(
            4,
            "Sports",
            "Sports cars are performance-oriented vehicles designed for high-speed driving and agile handling. They often have powerful engines, aerodynamic designs, and are built with lightweight materials.",
            "https://en.wikipedia.org/wiki/Sports_car"
        ),
    ]);
}

async function createItems() {
    console.log("Adding Items");
    await Promise.all([
        itemCreate(
            0,
            "Toyota Camry",
            " Known for its reliability, comfort, and fuel efficiency, the Toyota Camry is one of the best-selling sedans worldwide. It offers a smooth ride, spacious interior, and a range of available features.",
            [categories[0]],
            35000,
            9,
            "https://www.toyotabharat.com/showroom/camry/"
        ),
        itemCreate(
            1,
            "Honda Accord",
            "The Honda Accord is praised for its refined driving dynamics, upscale interior, and strong resale value. It offers a comfortable ride, advanced safety features, and efficient powertrains.",
            [categories[0]],
            37000,
            11,
            "https://www.carwale.com/honda-cars/accord/"
        ),
        itemCreate(
            2,
            "Mercedes-Benz E-Class",
            "The Mercedes-Benz E-Class sets the standard for luxury sedans with its elegant design, cutting-edge technology, and refined performance. It offers a luxurious interior, advanced driver assistance systems, and a range of powerful engine options.",
            [categories[0]],
            65000,
            5,
            "https://www.carwale.com/mercedes-benz-cars/e-class/"
        ),
        itemCreate(
            3,
            "BMW 5 Series",
            "The BMW 5 Series combines sporty handling, luxurious comfort, and advanced technology. It offers a spacious and well-appointed interior, powerful engines, and a range of high-tech features.",
            [categories[0]],
            65000,
            7,
            "https://www.carwale.com/bmw-cars/5-series/"
        ),
        itemCreate(
            4,
            "Audi A6",
            "The Audi A6 is known for its understated elegance, advanced infotainment system, and refined driving experience. It offers a comfortable and upscale interior, responsive handling, and available Quattro all-wheel drive.",
            [categories[0]],
            60000,
            9,
            "https://www.carwale.com/audi-cars/a6/"
        ),
        itemCreate(
            5,
            "Toyota RAV4",
            "The Toyota RAV4 is a compact SUV known for its reliability, fuel efficiency, and spacious interior. It offers a comfortable ride, available all-wheel drive, and a range of advanced safety features.",
            [categories[1]],
            40000,
            13,
            "https://www.toyota.com/rav4/"
        ),
        itemCreate(
            6,
            "Honda CR-V",
            "The Honda CR-V is a versatile compact SUV with a reputation for reliability and practicality. It offers a spacious and well-appointed interior, smooth ride, and strong resale value.",
            [categories[1]],
            35000,
            17,
            "https://www.cardekho.com/carmodels/Honda/Honda_CR-V",
        ),
        itemCreate(
            7,
            "Jeep Grand Cherokee",
            "The Jeep Grand Cherokee is a midsize SUV known for its off-road capability, rugged design, and upscale interior. It offers a range of powerful engines, advanced four-wheel-drive systems, and luxurious amenities.",
            [categories[1]],
            90000,
            3,
            "https://www.carwale.com/jeep-cars/grand-cherokee/"
        ),
        itemCreate(
            8,
            "Subaru Outback",
            " The Subaru Outback is a rugged crossover SUV known for its standard all-wheel drive, off-road capability, and versatile cargo space. It offers a comfortable ride, advanced safety features, and a reputation for durability.",
            [categories[1]],
            40000,
            12,
            "https://www.subaru.com/vehicles/outback.html"
        ),
        itemCreate(
            9,
            "Volkswagen Golf",
            "The Volkswagen Golf is a compact hatchback known for its solid build quality, refined interior, and engaging driving dynamics. It offers a range of efficient engines, upscale features, and advanced safety technologies.",
            [categories[2]],
            40000,
            11,
            "https://www.vw.com/en/models/golf-gti.html",
        ),
        itemCreate(
            10,
            "Honda Civic Hatchback",
            "The Honda Civic Hatchback offers a sporty design, practicality, and reliability. It provides a spacious and versatile interior, efficient powertrains, and a range of advanced safety features.",
            [categories[2]],
            30000,
            19,
            "https://automobiles.honda.com/civic-hatchback"
        ),
        itemCreate(
            11,
            "Toyota Corolla Hatchback",
            "The Toyota Corolla Hatchback combines practicality with style and efficiency. It offers a comfortable ride, a range of standard safety features, and a user-friendly infotainment system.",
            [categories[2]],
            25000,
            20,
            "https://www.toyota.com/corollahatchback/"
        ),
        itemCreate(
            12,
            "Mazda3 Hatchback",
            "The Mazda3 Hatchback is known for its upscale interior, athletic handling, and fuel-efficient engines. It offers a refined ride, premium materials, and advanced driver assistance features.",
            [categories[2]],
            30000,
            16,
            "https://www.mazdausa.com/vehicles/mazda3-hatchback"
        ),
        itemCreate(
            13,
            "Ford Focus Hatchback",
            "The Ford Focus Hatchback offers a well-rounded driving experience with responsive handling and a range of available features. It provides a spacious interior, modern technology, and efficient powertrains.",
            [categories[2]],
            30000,
            15,
            "https://www.cardekho.com/ford/focus"
        ),
        itemCreate(
            14,
            "Ford F-150",
            "The Ford F-150 is one of the best-selling pickup trucks globally, known for its durability, versatility, and capability. It offers a range of powerful engines, advanced towing features, and a spacious and well-equipped interior.",
            [categories[3]],
            70000,
            4,
            "https://www.ford.com/trucks/f150/"
        ),
        itemCreate(
            15,
            "Chevrolet Silverado 1500",
            "The Chevrolet Silverado 1500 offers a robust lineup of engines, a comfortable ride, and a spacious cabin. It provides advanced towing technologies, available off-road packages, and a range of trim levels to suit different needs.",
            [categories[3]],
            65000,
            7,
            "https://www.chevrolet.com/trucks/silverado/1500"
        ),
        itemCreate(
            16,
            "Ram 1500",
            "The Ram 1500 is known for its luxurious interior, smooth ride quality, and innovative features. It offers a range of powerful engines, advanced technology, and available air suspension for improved comfort and capability.",
            [categories[3]],
            70000,
            4,
            "https://www.ram.com/sa/en/ram-1500.html"
        ),
        itemCreate(
            17,
            "Toyota Tacoma",
            "The Toyota Tacoma is a popular midsize pickup truck known for its off-road capability, reliability, and resale value. It offers a range of trim levels, advanced off-road features, and a reputation for durability.",
            [categories[3]],
            45000,
            9,
            "https://www.toyota.com/tacoma/"
        ),
        itemCreate(
            18,
            "Ford Ranger",
            "The Ford Ranger is a compact pickup truck known for its strong turbocharged engine, capable off-road performance, and user-friendly technology. It offers a spacious cabin, available off-road packages, and advanced driver.",
            [categories[3]],
            45000,
            10,
            "https://www.ford.com/trucks/ranger/"
        ),
        itemCreate(
            19,
            "Porsche 911" ,
            "The Porsche 911 is an iconic sports car known for its timeless design, precision engineering, and exhilarating performance. It offers a range of powerful engines, sharp handling, and a luxurious interior.",
            [categories[4]],
            200000,
            6,
            "https://www.porsche.com/international/models/911/911-gt3-rs/911-gt3-rs/"
        ),
        itemCreate(
            20,
            "BMW M3",
            " The BMW M3 is a high-performance sports sedan known for its agility, precision, and driving dynamics. It offers a powerful turbocharged engine, sharp handling, and a luxurious interior.",
            [categories[4]],
            90000,
            9,
            "https://www.bmwusa.com/vehicles/m-models/m3-sedan/overview.html"
        ),
        itemCreate(
            21,
            "Nissan GT-R",
            "The Nissan GT-R, also known as the Godzilla, is a high-performance sports car known for its blistering acceleration, precise handling, and advanced technology. It offers a potent twin-turbo V6 engine, all-wheel drive, and a track-focused driving experience.",
            [categories[4]],
            210000,
            5,
            "https://www.nissanusa.com/vehicles/sports-cars/gt-r.html",
        ),
        itemCreate(
            22,
            "Toyota Supra",
            "The Toyota Supra is a legendary sports car known for its performance, style, and tunability. It offers a potent turbocharged inline-six engine, precise handling, and a driver-focused interior.",
            [categories[4]],
            60000,
            7,
            "https://www.toyota.com/grsupra/"
        ),
        itemCreate(
            23,
            "Jaguar F-Type",
            "The Jaguar F-Type is a British sports car known for its elegant design, exhilarating performance, and luxurious interior. It offers a range of powerful engines, dynamic handling, and a convertible option.",
            [categories[4]],
            125000,
            5,
            "https://www.jaguar.in/jaguar-range/f-type/index.html"
        )
    ])
}