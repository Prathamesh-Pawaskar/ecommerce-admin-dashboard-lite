// Gnerate a random date within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - daysAgo);
  return now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Gnerate a random status
const getRandomStatus = () => {
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Generate 15 mock orders
export const mockOrders = [
  { id: 'ORD001', customer: 'Alice Johnson', date: getRandomDate(), total: 120.50, status: getRandomStatus() },
  { id: 'ORD002', customer: 'Bob Smith', date: getRandomDate(), total: 25.00, status: getRandomStatus() },
  { id: 'ORD003', customer: 'Charlie Brown', date: getRandomDate(), total: 500.25, status: getRandomStatus() },
  { id: 'ORD004', customer: 'Diana Prince', date: getRandomDate(), total: 75.99, status: getRandomStatus() },
  { id: 'ORD005', customer: 'Eve Adams', date: getRandomDate(), total: 300.00, status: getRandomStatus() },
  { id: 'ORD006', customer: 'Frank Miller', date: getRandomDate(), total: 15.75, status: getRandomStatus() },
  { id: 'ORD007', customer: 'Grace Kelly', date: getRandomDate(), total: 99.00, status: getRandomStatus() },
  { id: 'ORD008', customer: 'Harry Potter', date: getRandomDate(), total: 210.00, status: getRandomStatus() },
  { id: 'ORD009', customer: 'Ivy Green', date: getRandomDate(), total: 65.50, status: getRandomStatus() },
  { id: 'ORD010', customer: 'Jack Sparrow', date: getRandomDate(), total: 180.20, status: getRandomStatus() },
  { id: 'ORD011', customer: 'Karen Black', date: getRandomDate(), total: 45.00, status: getRandomStatus() },
  { id: 'ORD012', customer: 'Liam Neeson', date: getRandomDate(), total: 1200.00, status: getRandomStatus() },
  { id: 'ORD013', customer: 'Mia Wallace', date: getRandomDate(), total: 88.88, status: getRandomStatus() },
  { id: 'ORD014', customer: 'Noah King', date: getRandomDate(), total: 34.99, status: getRandomStatus() },
  { id: 'ORD015', customer: 'Olivia White', date: getRandomDate(), total: 700.00, status: getRandomStatus() },
];

// Mock data for sales chart
export const mockSalesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Sales',
      data: [6500, 5900, 8000, 8100, 5600, 7500], 
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

export const mockProducts = [
  {
    id: 'PROD001',
    image: '1_8846aeac-00e8-4e16-8e64-08947c6f164b.webp',
    title: 'Wireless Earbuds',
    price: 59.99,
    stock: 150,
    description: 'High-quality wireless earbuds with noise cancellation and long battery life.',
  },
  {
    id: 'PROD002',
    image: '41xOc4-VsoL._UF894,1000_QL80_.jpg',
    title: 'Smart Watch X200',
    price: 199.99,
    stock: 80,
    description: 'Advanced smartwatch with heart rate monitoring, GPS, and water resistance.',
  },
  {
    id: 'PROD003',
    image: '71zoEeTAszL._UF1000,1000_QL80_.jpg',
    title: 'Portable Bluetooth Speaker',
    price: 79.50,
    stock: 200,
    description: 'Compact and powerful Bluetooth speaker with clear sound and deep bass.',
  },
  {
    id: 'PROD004',
    image: 'bpl-190-5-cm-75-inch-ultra-hd-4k-android-smart-led-tv-with-dolby-vision-and-audio-75u-a4010-digital-o491893311-p592004249-0-202408062329.jpeg',
    title: '4K Ultra HD LED TV',
    price: 799.00,
    stock: 30,
    description: 'Stunning 4K resolution with vibrant colors and smart TV features.',
  },
  {
    id: 'PROD005',
    image: '71m901lXArL.jpg',
    title: 'Ergonomic Office Chair',
    price: 249.99,
    stock: 50,
    description: 'Comfortable and supportive chair for long hours of work, with adjustable features.',
  },

  {
    id: 'PROD006',
    image: '616fdRSET7L.jpg',
    title: 'Gaming Keyboard',
    price: 89.99,
    stock: 120,
    description: 'Mechanical gaming keyboard with customizable RGB lighting and durable keys.',
  },
];