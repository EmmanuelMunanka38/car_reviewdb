import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const uuid = (n) => `00000000-0000-0000-0000-${String(n).padStart(12, '0')}`;

const ADMIN_ID = uuid(1);
const now = new Date();

const contentSections = (...sections) => sections;

const reviews = [
  {
    id: uuid(10),
    slug: '2024-toyota-camry-review',
    title: '2024 Toyota Camry Review: The Reliable Sedan Gets a Refresh',
    excerpt: 'The Toyota Camry remains the benchmark for mid-size sedans with its blend of reliability, comfort, and efficiency.',
    featured_image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Toyota Camry enters the new model year with subtle styling updates and enhanced standard features. As America\'s best-selling sedan for over two decades, the Camry continues to offer a compelling package for buyers seeking dependable transportation with a touch of refinement.' },
      { heading: 'Performance and Handling', body: 'Under the hood, the Camry offers a choice between a 2.5-liter four-cylinder engine producing 203 horsepower and a 3.5-liter V6 that churns out 301 horsepower. Both engines are paired with a smooth-shifting eight-speed automatic transmission. The ride is composed and quiet, making it an excellent highway cruiser.' },
      { heading: 'Interior and Technology', body: 'Inside, the Camry features a redesigned dashboard with a standard 7-inch touchscreen (8-inch on higher trims) that supports wireless Apple CarPlay and Android Auto. Higher trims add leather upholstery, heated and ventilated front seats, and a premium JBL audio system.' },
      { heading: 'Fuel Economy', body: 'The four-cylinder engine delivers an impressive 28 mpg city and 39 mpg highway, while the V6 returns 22 mpg city and 33 mpg highway. The hybrid variant achieves up to 51 mpg combined, making it one of the most fuel-efficient vehicles in its class.' },
      { heading: 'Verdict', body: 'The 2024 Toyota Camry may not be the most exciting car in its segment, but it excels at being a well-rounded, dependable, and efficient mode of transportation. It is a smart choice for anyone prioritizing practicality and long-term value.' }
    ),
    rating: 4.3,
    status: 'published',
    featured: true,
    views: 1542,
    published_at: new Date('2024-01-15'),
    created_by: ADMIN_ID,
    specs: {
      engine: '2.5L I4 / 3.5L V6',
      horsepower: 203,
      torque: 184,
      transmission: '8-Speed Automatic',
      drivetrain: 'FWD',
      fuel_type: 'Regular Unleaded',
      fuel_economy: '28 city / 39 hwy',
      seating: 5,
      price: 27295,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', alt_text: '2024 Toyota Camry front view', sort_order: 1 },
      { image_url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800', alt_text: '2024 Toyota Camry interior', sort_order: 2 },
      { image_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800', alt_text: '2024 Toyota Camry rear view', sort_order: 3 },
    ],
  },
  {
    id: uuid(11),
    slug: '2024-tesla-model-3-review',
    title: '2024 Tesla Model 3 Review: The Electric Benchmark',
    excerpt: 'The Tesla Model 3 continues to dominate the EV market with class-leading range, performance, and access to the Supercharger network.',
    featured_image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    manufacturer: 'Tesla',
    model: 'Model 3',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Tesla Model 3 receives a subtle refresh with updated styling, improved aerodynamics, and a revised interior. As the best-selling electric car in the world, the Model 3 continues to set the standard for what an EV should be.' },
      { heading: 'Performance and Range', body: 'The Model 3 lineup starts with the rear-wheel-drive version offering 272 miles of range. The Long Range AWD boosts that to 341 miles, while the Performance model delivers 303 miles with blistering acceleration to 60 mph in just 3.1 seconds.' },
      { heading: 'Interior and Minimalism', body: 'Tesla\'s minimalist interior philosophy means almost everything is controlled through the 15-inch central touchscreen. The cabin is clean and modern with high-quality materials. The refreshed model adds ventilated seats and a rear passenger display.' },
      { heading: 'Charging and Ownership', body: 'Access to Tesla\'s extensive Supercharger network remains a significant advantage. With V3 Superchargers, the Model 3 can add up to 200 miles of range in just 15 minutes. Over-the-air updates continue to improve the vehicle over time.' },
      { heading: 'Verdict', body: 'The 2024 Tesla Model 3 remains the EV to beat. Its combination of range, performance, technology, and charging infrastructure is unmatched. While build quality has historically been a concern, recent improvements have addressed many issues.' }
    ),
    rating: 4.5,
    status: 'published',
    featured: true,
    views: 3201,
    published_at: new Date('2024-02-01'),
    created_by: ADMIN_ID,
    specs: {
      engine: 'Dual Motor Electric',
      horsepower: 450,
      torque: 471,
      transmission: 'Single-Speed Direct Drive',
      drivetrain: 'AWD',
      fuel_type: 'Electric',
      fuel_economy: '132 MPGe combined',
      top_speed: '162 mph',
      acceleration: '3.1 sec 0-60',
      seating: 5,
      price: 38990,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', alt_text: '2024 Tesla Model 3 front', sort_order: 1 },
      { image_url: 'https://images.unsplash.com/photo-1617886903355-935bb6605776?w=800', alt_text: '2024 Tesla Model 3 side profile', sort_order: 2 },
    ],
  },
  {
    id: uuid(12),
    slug: '2024-ford-mustang-gt-review',
    title: '2024 Ford Mustang GT Review: America\'s Iconic Pony Car',
    excerpt: 'The seventh-generation Ford Mustang GT proves that the V8 muscle car is alive and thriving with modern tech and classic thrills.',
    featured_image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800',
    manufacturer: 'Ford',
    model: 'Mustang GT',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Ford Mustang GT represents the seventh generation of America\'s favorite pony car. With a naturally aspirated V8 engine, available manual transmission, and a host of modern technology, the Mustang GT proves there is still life in the internal combustion engine.' },
      { heading: 'Performance', body: 'The 5.0-liter Coyote V8 engine produces 486 horsepower and 418 lb-ft of torque. It can be paired with either a six-speed manual transmission or a ten-speed automatic. The GT sprints from 0-60 mph in just 4.3 seconds and covers the quarter-mile in 12.6 seconds.' },
      { heading: 'Driving Experience', body: 'The Mustang GT delivers a visceral driving experience that is increasingly rare. The V8 engine note is intoxicating, especially with the active exhaust system. The handling has been improved with a revised independent rear suspension and available MagneRide dampers.' },
      { heading: 'Interior and Tech', body: 'The cabin features a dual-screen setup with a 12.4-inch digital instrument cluster and a 13.2-inch SYNC 4 infotainment system. The interior is a significant step up from the previous generation with better materials and more modern design.' },
      { heading: 'Verdict', body: 'The 2024 Ford Mustang GT is a celebration of everything that makes American muscle cars great. It combines raw power with modern technology and genuine driving engagement. If this is the last purely ICE Mustang, it is going out on a high note.' }
    ),
    rating: 4.6,
    status: 'published',
    featured: true,
    views: 2890,
    published_at: new Date('2024-03-10'),
    created_by: ADMIN_ID,
    specs: {
      engine: '5.0L Coyote V8',
      horsepower: 486,
      torque: 418,
      transmission: '6-Speed Manual / 10-Speed Auto',
      drivetrain: 'RWD',
      fuel_type: 'Premium Unleaded',
      fuel_economy: '15 city / 24 hwy',
      top_speed: '155 mph',
      acceleration: '4.3 sec 0-60',
      seating: 4,
      price: 43340,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800', alt_text: 'Ford Mustang GT front three quarter', sort_order: 1 },
      { image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', alt_text: 'Ford Mustang GT rear', sort_order: 2 },
    ],
  },
  {
    id: uuid(13),
    slug: '2024-honda-civic-sport-review',
    title: '2024 Honda Civic Sport Review: The Compact King',
    excerpt: 'The Honda Civic continues to set the standard for compact cars with its refined ride, quality interior, and excellent fuel economy.',
    featured_image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f80?w=800',
    manufacturer: 'Honda',
    model: 'Civic Sport',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Honda Civic remains the gold standard in the compact car segment. Now in its eleventh generation, the Civic offers a mature, refined driving experience that punches well above its price class.' },
      { heading: 'Powertrain', body: 'The Civic Sport is powered by a 2.0-liter four-cylinder engine producing 158 horsepower and 138 lb-ft of torque, paired with a continuously variable transmission (CVT). While not particularly quick, the powertrain is smooth and responsive.' },
      { heading: 'Interior Quality', body: 'The Civic\'s interior is a highlight of the segment, with a clean, modern design and impressive material quality. The standard 7-inch touchscreen (9-inch on higher trims) runs Honda\'s intuitive infotainment system with wireless Apple CarPlay and Android Auto.' },
      { heading: 'Safety and Reliability', body: 'Honda Sensing safety suite comes standard on all trims, including adaptive cruise control, lane-keeping assist, and collision mitigation braking. The Civic has earned Top Safety Pick+ ratings from the IIHS.' },
      { heading: 'Verdict', body: 'The 2024 Honda Civic Sport is the smart choice in the compact car segment. It offers a premium feel at an affordable price, excellent fuel economy, and Honda\'s legendary reliability. It is hard to find a better all-around vehicle at this price point.' }
    ),
    rating: 4.4,
    status: 'published',
    featured: false,
    views: 1876,
    published_at: new Date('2024-01-28'),
    created_by: ADMIN_ID,
    specs: {
      engine: '2.0L I4',
      horsepower: 158,
      torque: 138,
      transmission: 'CVT',
      drivetrain: 'FWD',
      fuel_type: 'Regular Unleaded',
      fuel_economy: '31 city / 40 hwy',
      seating: 5,
      price: 24950,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1609521263047-f8f205293f80?w=800', alt_text: 'Honda Civic front view', sort_order: 1 },
    ],
  },
  {
    id: uuid(14),
    slug: '2024-bmw-x5-review',
    title: '2024 BMW X5 Review: The Luxury SUV Benchmark',
    excerpt: 'The BMW X5 continues to dominate the luxury SUV segment with its perfect blend of performance, comfort, and technology.',
    featured_image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    manufacturer: 'BMW',
    model: 'X5',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 BMW X5 receives a mid-cycle refresh with updated styling, enhanced technology, and a new plug-in hybrid powertrain. As the pioneer of the Sports Activity Vehicle segment, the X5 continues to define what a luxury SUV should be.' },
      { heading: 'Performance', body: 'The X5 xDrive40i features a 3.0-liter turbocharged inline-six with 48V mild hybrid assistance, producing 375 horsepower. The range-topping M60i packs a 4.4-liter twin-turbo V8 with 523 horsepower. Both are paired with an excellent 8-speed automatic transmission.' },
      { heading: 'Luxury Interior', body: 'The cabin is a masterpiece of luxury and technology. The curved display houses a 12.3-inch instrument cluster and 14.9-inch infotainment screen running BMW\'s latest iDrive 8.5 system. Merino leather, heated seats, and ambient lighting are standard.' },
      { heading: 'Driving Dynamics', body: 'Despite its size and weight, the X5 handles with remarkable poise. The adaptive air suspension provides a magic carpet ride while keeping body roll in check. The xDrive all-wheel-drive system provides excellent traction in all conditions.' },
      { heading: 'Verdict', body: 'The 2024 BMW X5 remains the benchmark in the luxury midsize SUV segment. It offers the perfect balance of performance, luxury, and practicality. While it commands a premium price, the X5 delivers a truly premium experience.' }
    ),
    rating: 4.7,
    status: 'published',
    featured: true,
    views: 2134,
    published_at: new Date('2024-04-05'),
    created_by: ADMIN_ID,
    specs: {
      engine: '3.0L Turbo I6 / 4.4L Twin-Turbo V8',
      horsepower: 375,
      torque: 398,
      transmission: '8-Speed Automatic',
      drivetrain: 'AWD',
      fuel_type: 'Premium Unleaded',
      fuel_economy: '21 city / 27 hwy',
      top_speed: '155 mph',
      acceleration: '5.2 sec 0-60',
      seating: 5,
      price: 65700,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', alt_text: 'BMW X5 front view', sort_order: 1 },
      { image_url: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800', alt_text: 'BMW X5 interior', sort_order: 2 },
    ],
  },
  {
    id: uuid(15),
    slug: '2024-porsche-911-carrera-review',
    title: '2024 Porsche 911 Carrera Review: The Timeless Sports Car',
    excerpt: 'The Porsche 911 Carrera remains the definitive sports car, blending iconic design with world-class performance and everyday usability.',
    featured_image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
    manufacturer: 'Porsche',
    model: '911 Carrera',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Porsche 911 Carrera continues the legacy of an icon. Now in its 992 generation, the 911 remains the benchmark for sports cars, offering a unique combination of performance, prestige, and surprising practicality.' },
      { heading: 'Engine and Performance', body: 'The Carrera is powered by a 3.0-liter twin-turbocharged flat-six engine producing 379 horsepower and 331 lb-ft of torque. With the optional PDK dual-clutch transmission, it sprints from 0-60 mph in just 4.0 seconds (3.8 with Sport Chrono).' },
      { heading: 'Handling and Dynamics', body: 'The 911\'s rear-engine layout provides unique handling characteristics that no other sports car can replicate. The steering is exquisitely communicative, and the chassis balance is near-perfect. It is equally at home on a twisty back road as it is on a racetrack.' },
      { heading: 'Interior and Daily Usability', body: 'Surprisingly practical for a sports car, the 911 offers a frunk with enough space for luggage and a rear seat area suitable for children or additional storage. The interior is driver-focused with excellent build quality and material selection.' },
      { heading: 'Verdict', body: 'The 2024 Porsche 911 Carrera is more than just a sports car; it is an engineering masterpiece. It delivers thrilling performance while remaining usable every day. For those who can afford the entry price, the 911 offers an unmatched ownership experience.' }
    ),
    rating: 4.8,
    status: 'published',
    featured: true,
    views: 4102,
    published_at: new Date('2024-05-20'),
    created_by: ADMIN_ID,
    specs: {
      engine: '3.0L Twin-Turbo Flat-6',
      horsepower: 379,
      torque: 331,
      transmission: '8-Speed PDK / 7-Speed Manual',
      drivetrain: 'RWD',
      fuel_type: 'Premium Unleaded',
      fuel_economy: '18 city / 25 hwy',
      top_speed: '182 mph',
      acceleration: '4.0 sec 0-60',
      seating: 4,
      price: 114400,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800', alt_text: 'Porsche 911 front three quarter', sort_order: 1 },
      { image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', alt_text: 'Porsche 911 rear view', sort_order: 2 },
      { image_url: 'https://images.unsplash.com/photo-1611823145742-bb0f0e69f209?w=800', alt_text: 'Porsche 911 driving on road', sort_order: 3 },
    ],
  },
  {
    id: uuid(16),
    slug: '2024-hyundai-ioniq-5-review',
    title: '2024 Hyundai Ioniq 5 Review: Retro-Futuristic EV Excellence',
    excerpt: 'The Hyundai Ioniq 5 stands out with its unique design, ultra-fast charging, and impressive range, making it a top EV choice.',
    featured_image: 'https://images.unsplash.com/photo-1661033952206-5b6dea3e22c9?w=800',
    manufacturer: 'Hyundai',
    model: 'Ioniq 5',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Hyundai Ioniq 5 continues to turn heads with its distinctive retro-futuristic design inspired by the 1974 Hyundai Pony concept. It combines striking looks with cutting-edge EV technology and exceptional practicality.' },
      { heading: 'Powertrain and Range', body: 'The Ioniq 5 offers multiple configurations: a standard-range 58 kWh battery with 168 hp, and a long-range 77.4 kWh battery with 225 hp (RWD) or 320 hp (AWD). The long-range RWD version achieves an estimated 303 miles of range.' },
      { heading: 'Ultra-Fast Charging', body: 'Built on Hyundai\'s E-GMP platform, the Ioniq 5 supports 800V ultra-fast charging, allowing it to charge from 10% to 80% in just 18 minutes on a 350 kW charger. It also features Vehicle-to-Load (V2L) capability for powering external devices.' },
      { heading: 'Interior and Space', body: 'The interior is spacious and minimalist, with a flat floor made possible by the dedicated EV platform. The reclining front seats, sliding center console, and sustainable materials create a unique cabin environment.' },
      { heading: 'Verdict', body: 'The 2024 Hyundai Ioniq 5 is one of the most compelling EVs on the market. Its distinctive design, rapid charging capability, and generous standard equipment make it a standout choice in the increasingly crowded electric crossover segment.' }
    ),
    rating: 4.5,
    status: 'published',
    featured: false,
    views: 1654,
    published_at: new Date('2024-02-15'),
    created_by: ADMIN_ID,
    specs: {
      engine: 'Electric (Single/Dual Motor)',
      horsepower: 320,
      torque: 446,
      transmission: 'Single-Speed Direct Drive',
      drivetrain: 'RWD / AWD',
      fuel_type: 'Electric',
      fuel_economy: '110 MPGe combined',
      top_speed: '115 mph',
      acceleration: '4.9 sec 0-60',
      seating: 5,
      price: 41750,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1661033952206-5b6dea3e22c9?w=800', alt_text: 'Hyundai Ioniq 5 front view', sort_order: 1 },
    ],
  },
  {
    id: uuid(17),
    slug: '2024-chevrolet-corvette-review',
    title: '2024 Chevrolet Corvette Stingray Review: America\'s Supercar',
    excerpt: 'The mid-engine Chevrolet Corvette Stingray delivers supercar performance at a fraction of the price of its European rivals.',
    featured_image: 'https://images.unsplash.com/photo-1630841539293-bd20634c5d72?w=800',
    manufacturer: 'Chevrolet',
    model: 'Corvette Stingray',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Chevrolet Corvette Stingray (C8) continues to redefine expectations for American sports cars. With its mid-engine layout, the Corvette now offers true supercar proportions and performance at a price that undercuts European rivals by tens of thousands of dollars.' },
      { heading: 'Performance', body: 'The 6.2-liter LT2 V8 engine produces 490 horsepower (495 with the performance exhaust) and 470 lb-ft of torque. The dual-clutch 8-speed Tremec transmission delivers lightning-fast gear changes. The 0-60 mph sprint takes just 2.9 seconds.' },
      { heading: 'Handling', body: 'The mid-engine layout transforms the Corvette\'s handling dynamics. The balance is neutral and predictable, with incredible grip from the staggered wheel and tire setup. The available Z51 performance package adds enhanced cooling, brakes, and a limited-slip differential.' },
      { heading: 'Interior', body: 'The driver-focused cockpit wraps around the occupant with controls oriented toward the driver. The quality of materials has improved significantly, though some plastics still remind you this is a value-oriented supercar.' },
      { heading: 'Verdict', body: 'The 2024 Chevrolet Corvette Stingray is an engineering triumph. It delivers performance that rivals cars costing two or three times as much. The C8 Corvette proves that America can build a world-class mid-engine sports car that is both thrilling and livable.' }
    ),
    rating: 4.7,
    status: 'published',
    featured: false,
    views: 3567,
    published_at: new Date('2024-06-01'),
    created_by: ADMIN_ID,
    specs: {
      engine: '6.2L LT2 V8',
      horsepower: 490,
      torque: 470,
      transmission: '8-Speed Dual-Clutch',
      drivetrain: 'RWD',
      fuel_type: 'Premium Unleaded',
      fuel_economy: '16 city / 24 hwy',
      top_speed: '184 mph',
      acceleration: '2.9 sec 0-60',
      seating: 2,
      price: 68300,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1630841539293-bd20634c5d72?w=800', alt_text: 'Corvette C8 front view', sort_order: 1 },
      { image_url: 'https://images.unsplash.com/photo-1610342331055-0f88b1985ee1?w=800', alt_text: 'Corvette C8 rear three quarter', sort_order: 2 },
    ],
  },
  {
    id: uuid(18),
    slug: '2024-subaru-outback-review',
    title: '2024 Subaru Outback Review: The Adventure Wagon',
    excerpt: 'The Subaru Outback remains the go-to choice for outdoor enthusiasts with its standard AWD, generous ground clearance, and rugged versatility.',
    featured_image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800',
    manufacturer: 'Subaru',
    model: 'Outback',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Subaru Outback continues to occupy a unique niche as a lifted wagon that combines SUV capability with car-like driving dynamics. It is the vehicle of choice for outdoor enthusiasts who need practicality without sacrificing comfort.' },
      { heading: 'Powertrain Options', body: 'Two engine options are available: a 2.5-liter flat-four producing 182 horsepower and a 2.4-liter turbocharged flat-four with 260 horsepower. Both are paired with a Lineartronic CVT and Subaru\'s legendary symmetrical all-wheel-drive system.' },
      { heading: 'Off-Road Capability', body: 'With 8.7 inches of ground clearance, the Outback matches many SUVs in capability. The X-Mode system optimizes AWD performance for various terrain types, while hill descent control adds confidence on steep trails.' },
      { heading: 'Interior and Cargo', body: 'The cabin is practical and durable, with water-repellent upholstery available. Cargo space measures 32.5 cubic feet behind the rear seats and 75.7 cubic feet with them folded. The standard roof rails can handle up to 700 pounds.' },
      { heading: 'Verdict', body: 'The 2024 Subaru Outback is a uniquely capable vehicle that fills a specific niche better than any competitor. It offers the versatility of an SUV with the driving dynamics of a wagon, all backed by Subaru\'s reputation for durability and safety.' }
    ),
    rating: 4.2,
    status: 'published',
    featured: false,
    views: 1234,
    published_at: new Date('2024-03-22'),
    created_by: ADMIN_ID,
    specs: {
      engine: '2.5L H4 / 2.4L Turbo H4',
      horsepower: 182,
      torque: 176,
      transmission: 'CVT',
      drivetrain: 'AWD',
      fuel_type: 'Regular Unleaded',
      fuel_economy: '26 city / 33 hwy',
      seating: 5,
      price: 29040,
    },
    gallery: [],
  },
  {
    id: uuid(19),
    slug: '2024-mercedes-benz-eqs-review',
    title: '2024 Mercedes-Benz EQS Review: The Electric S-Class',
    excerpt: 'The Mercedes-Benz EQS represents the pinnacle of electric luxury with exceptional range, opulent comfort, and cutting-edge technology.',
    featured_image: 'https://images.unsplash.com/photo-1667582386057-2e8d0b8980d2?w=800',
    manufacturer: 'Mercedes-Benz',
    model: 'EQS',
    year: 2024,
    content: contentSections(
      { heading: 'Overview', body: 'The 2024 Mercedes-Benz EQS is the electric flagship that sets a new standard for luxury EVs. It combines the opulence expected of an S-Class with the latest electric powertrain technology, creating a truly compelling executive sedan.' },
      { heading: 'Range and Charging', body: 'The EQS 450+ offers an EPA-estimated range of 350 miles from its 107.8 kWh battery pack. The 580 4MATIC version provides 305 miles of range with dual-motor all-wheel drive. DC fast charging at up to 200 kW can add 186 miles in just 15 minutes.' },
      { heading: 'The MBUX Hyperscreen', body: 'The optional MBUX Hyperscreen is the centerpiece of the EQS interior, spanning the entire dashboard with three displays under a single 56-inch curved glass surface. It is one of the most impressive infotainment systems available in any production vehicle.' },
      { heading: 'Ride Comfort', body: 'The EQS delivers a serene driving experience with whisper-quiet operation and an air suspension that glides over imperfections. The rear-seat comfort package transforms the EQS into a chauffeur-driven limousine.' },
      { heading: 'Verdict', body: 'The 2024 Mercedes-Benz EQS successfully translates the S-Class formula into the electric age. It offers exceptional range, breathtaking technology, and unparalleled comfort. For those seeking the ultimate electric luxury sedan, the EQS is the benchmark.' }
    ),
    rating: 4.6,
    status: 'published',
    featured: false,
    views: 1987,
    published_at: new Date('2024-04-18'),
    created_by: ADMIN_ID,
    specs: {
      engine: 'Electric (Single/Dual Motor)',
      horsepower: 516,
      torque: 611,
      transmission: 'Single-Speed Direct Drive',
      drivetrain: 'RWD / AWD',
      fuel_type: 'Electric',
      fuel_economy: '97 MPGe combined',
      top_speed: '130 mph',
      acceleration: '4.1 sec 0-60',
      seating: 5,
      price: 104400,
    },
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1667582386057-2e8d0b8980d2?w=800', alt_text: 'Mercedes EQS front view', sort_order: 1 },
    ],
  },
];

const comments = [
  { review_id: uuid(10), author_name: 'John D.', author_email: 'john@example.com', body: 'Great review! I have owned a Camry for 5 years and it has been absolutely reliable. The hybrid version is amazing on fuel.', status: 'approved' },
  { review_id: uuid(10), author_name: 'Sarah M.', body: 'I wish they had mentioned the AWD option. That is a game-changer for those of us in snowy climates.', status: 'approved' },
  { review_id: uuid(10), author_name: 'Spam Bot', author_email: 'spam@spam.com', body: 'Check out my website for cheap prices!!!', status: 'spam' },
  { review_id: uuid(11), author_name: 'Mike T.', body: 'The Model 3 is incredible. I switched from a BMW 3-series and have never looked back. The Supercharger network makes road trips easy.', status: 'approved' },
  { review_id: uuid(11), author_name: 'Lisa R.', body: 'Build quality is still an issue on some examples. My friend had panel gaps on his. But overall it is a great car.', status: 'approved' },
  { review_id: uuid(11), author_name: 'EV Fan', body: 'Best EV on the market right now. Period.', status: 'pending' },
  { review_id: uuid(12), author_name: 'Tom H.', author_email: 'tom@example.com', body: 'Nothing beats the sound of a V8. Long live the Mustang!', status: 'approved' },
  { review_id: uuid(12), author_name: 'Alex K.', body: 'I test drove this and the Mach-E. Both are great, but the GT is the one that puts a smile on your face.', status: 'approved' },
  { review_id: uuid(14), author_name: 'David L.', body: 'The X5 is the best all-around luxury SUV. Period. We have had three generations and each one gets better.', status: 'approved' },
  { review_id: uuid(15), author_name: 'James W.', author_email: 'james@example.com', body: 'The 911 is my dream car. One day! Great review, really captures what makes it special.', status: 'approved' },
  { review_id: uuid(15), author_name: 'Petrolhead99', body: 'The 911 is the only sports car you will ever need. It can do everything.', status: 'pending' },
  { review_id: uuid(17), author_name: 'Chris B.', body: 'Incredible what Chevrolet has achieved with the C8. At $68k, nothing else comes close.', status: 'approved' },
  { review_id: uuid(17), author_name: 'Racing Mike', body: 'I track my C8 and it is absolutely capable on track. Brakes get hot but otherwise it is a superstar.', status: 'approved' },
  { review_id: uuid(19), author_name: 'Oscar G.', body: 'The Hyperscreen is incredible. The EQS truly feels like the future of luxury.', status: 'approved' },
  { review_id: uuid(19), author_name: 'Eleanor', body: 'For this price, I would still take a Model S Plaid. Better performance and more charging stations.', status: 'pending' },
];

async function main() {
  console.log('Seeding database...');

  await prisma.comment.deleteMany();
  await prisma.reviewGallery.deleteMany();
  await prisma.reviewSpec.deleteMany();
  await prisma.review.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({ data: { id: ADMIN_ID, full_name: 'Admin User', role: 'admin' } });

  for (const review of reviews) {
    const { specs, gallery, ...reviewData } = review;
    await prisma.review.create({
      data: {
        ...reviewData,
        specs: specs ? { create: specs } : undefined,
        gallery: gallery.length > 0 ? { create: gallery } : undefined,
      },
    });
  }

  for (const comment of comments) {
    await prisma.comment.create({ data: comment });
  }

  console.log(`Seeded: 1 admin profile, ${reviews.length} reviews, ${comments.length} comments`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
