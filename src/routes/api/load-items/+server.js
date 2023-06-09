import fs from 'fs';

const DB_PATH = './lib/json/local_storage.json';

export const GET = () => {
   let localStorageBoilerplate = { 
      items: { 
         expenses: [], 
         savings: [], 
         incomes: [] 
      },
      total_balance: 0,
      expenses_balance: 0,
      savings_balance: 0,
      incomes_balance: 0,
   };
   
   let local_storage
   try {
      local_storage = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
   } catch (err) {
      // console.error(err);
      console.log('Database found empty.\nCreating new database...');
      fs.writeFileSync(DB_PATH, JSON.stringify(localStorageBoilerplate));
      local_storage = localStorageBoilerplate;
      console.log('New database created:');
      console.log(local_storage);
   }

   if (local_storage?.items) {
      return new Response(JSON.stringify(local_storage), { status: 200 });
   } else if (local_storage?.parseable) {
      return new Response(JSON.stringify({ error: 'Database is not valid.' }), { status: 500 });
   } 
}