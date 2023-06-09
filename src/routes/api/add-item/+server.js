// import fs from 'fs';
// const DB_PATH = './lib/json/local_storage.json';

// export const POST = async ({ request }) => {
//    let body = await request.json();
//    let localStorage;

//    try {
//       localStorage = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
//    } catch (err) {
//       console.error(err);
//    }

//    function insertItem () {
//       if (body.item.title && body.item.amount && body.item.category) {
//          switch(body.operation) {
//             case 'expense':
//                localStorage.items.expenses.push(body.item);
//                break;
//             case 'saving':
//                localStorage.items.savings.push(body.item);
//                break;
//             case 'income':
//                localStorage.items.incomes.push(body.item);
//                break;
//          }
//          fs.writeFileSync(DB_PATH, JSON.stringify(localStorage));
//       }
//    }

//    insertItem();

//    if (local_storage?.items) {
//       return new Response(JSON.stringify(local_storage), { status: 200 });
//    } else if (local_storage?.parseable) {
//       return new Response(JSON.stringify({ error: 'Database is not valid.' }), { status: 500 });
//    } 
// }