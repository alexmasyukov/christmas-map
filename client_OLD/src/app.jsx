import React from 'react'
// import price from './assets/price.json'

const toCategorySQLQuery = (id, [name]) => {
  const title = name.replace('---', '').trim()
  const cpu = ''
  const cpu_path = ''

  return `${title}|INSERT INTO price_categories (id, parent_id, title, sorting, cpu, cpu_path, public) VALUES 
      ('${id}', 0, '${title}', ${id}, '***cpu***${cpu}', '***cpu_path***${cpu_path}', 1);`
}

const toSQLQuery = (id, cid, [title, count, price]) => {
  const [_, def_count, units] = count.split(/^(\S+)\s(.+)$/)
  return `INSERT INTO price (id, category_id, title, price, units, def_count) VALUES 
    ('${id}', '${cid}', '${title}', '${price}', '${units.trim()}', '${def_count.trim()}');`
}

const App = () => {
  // const items = price.items.reduce(({ lastId, lastCid, sqlQueries }, current) => {
  //   if (current.length === 1) {
  //     const id = lastCid + 1
  //     const query = toCategorySQLQuery(id, current)

  //     return {
  //       lastId,
  //       lastCid: id,
  //       sqlQueries: [...sqlQueries, query]
  //     }
  //   }

  //   const id = lastId + 1
  //   return {
  //     lastId: id,
  //     lastCid,
  //     sqlQueries: [...sqlQueries, toSQLQuery(id, lastCid, current)]
  //   }

  // }, {
  //   lastId: 0,
  //   lastCid: 0,
  //   sqlQueries: []
  // })


  return (
     <>
       {/* {items.sqlQueries.map(query => <>"{query}",<br/></>)} */}
     </>
  )
}

export default App