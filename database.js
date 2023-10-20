let sql = require("mssql");
const config = require("./dbConfig");

function getFormatDate(now, isStartMonth = false) {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const hour = now.getHours();
  const date = isStartMonth
    ? "01"
    : hour < 10
    ? now.getDate() - 1
    : now.getDate();
  const dateNow = `${month}-${date}-${year} `;
  return dateNow;
}

async function getAktualSales() { // pinjam, ini query detail tiap customer
  try {
    await sql.connect(config);
    let now = getFormatDate(new Date());
    let start = getFormatDate(new Date(), true);
    let queries = `SELECT
    Target.tahun AS tahun,
        Target.bulan AS bulan,
        Target.namaCustomer,
        Target.quantity as targetQty,
        Aktual.quantity as aktualQty,
        Target.totalUSD as totalTargetUSD,
        Aktual.totalUSD as totalAktualUSD
    FROM (
    SELECT
              T0.[DocDate] as 'date',
              T0.[CardName] as 'namaCustomer',
              T1.[itemCode],
              T1.[Quantity] - ISNULL(v.[quantity], 0) - ISNULL(x.[quantity], 0) AS [quantity],
              T1.Price as 'price',
              CASE
                  WHEN T1.Currency = 'IDR' THEN T1.Price * T1.Quantity / f.Rate
                  WHEN T1.Currency = 'JPY' THEN T1.Price * T1.Quantity / f.Rate
                  ELSE T1.Price * T1.Quantity
              END AS 'totalUSD'
          FROM
              ODLN T0
              INNER JOIN DLN1 T1 ON T0.[DocEntry] = T1.[DocEntry]
              LEFT JOIN (
                  SELECT
                      baseentry,
                      basetype,
                      baseline,
                      SUM(quantity) AS [quantity]
                  FROM
                      rdn1 WITH (NOLOCK)
                  GROUP BY
                      baseentry,
                      basetype,
                      baseline
              ) v ON v.BaseEntry = T1.DocEntry
              AND v.BaseType = T1.ObjType
              AND v.BaseLine = T1.LineNum
              LEFT JOIN (
                  SELECT
                      a.baseentry,
                      a.basetype,
                      a.baseline,
                      SUM(b.quantity) AS [quantity]
                  FROM
                      inv1 a WITH (NOLOCK)
                      LEFT JOIN RIN1 b WITH (NOLOCK) ON a.DocEntry = b.BaseEntry
                      AND a.ObjType = b.BaseType
                      AND a.LineNum = b.BaseLine
                  GROUP BY
                      a.baseentry,
                      a.basetype,
                      a.baseline
              ) x ON x.BaseEntry = T1.DocEntry
              AND x.BaseType = T1.ObjType
              AND x.BaseLine = T1.LineNum
              LEFT JOIN ortt f ON T1.Currency = f.Currency
              AND T1.DocDate = f.RateDate
          WHERE
              T0.DocDate >= '2023-10-01'
              AND T0.DocDate <= '2023-10-31'
              AND (
                  T1.LineStatus = 'O'
                  OR (T0.CANCELED NOT IN ('Y', 'C'))
                  OR (
                      T1.LineStatus = 'C'
                      AND ISNULL(t1.Targettype, '-1') NOT IN ('-1', '15')
                      AND ISNULL(t1.TrgetEntry, '') <> ''
                  )
              )
              AND (
                  T1.[Quantity] - ISNULL(v.[quantity], 0) - ISNULL(x.[quantity], 0)
              ) <> 0
    ) as Aktual
    JOIN 
    (
    SELECT
              Datepart (yy, b.Date) as tahun,
              DATENAME(MONTH, b.Date)AS bulan,
              d.U_MIS_InCusName as 'namaCustomer',
              b. itemCode,
              b. quantity,
      
              c. price ,
              CASE
              WHEN c.currency = 'IDR' THEN c.price * b.quantity / f.rate
              WHEN c.currency = 'JPY' THEN c.price * b.quantity / f.rate
              ELSE c.price * b.quantity
      
              END AS 'totalUSD'
      
              from ofct a
              left join ocrd d on a.Name = d.CardCode
              left join FCT1 b on a.AbsID = b.AbsID
              left join itm1 c on b.ItemCode = c.ItemCode
              left join ortt f on c.currency = f.currency and b.Date = f.RateDate
              left join oitm g on b.itemcode = g.itemcode
      
              WHERE
              b.Date >= '10-01-2023' and b.Date <= '10-31-2023'
              and
              c.PriceList = 1
              and
              g.Validfor = 'Y'
      
    ) as Target 
    ON Aktual.ItemCode = Target.ItemCode;`;
    let result = await sql.query(queries);

    // let formattedResult = result.recordset.reduce((acc, curr) => {
    //   if (!acc[curr.namaCustomer]) {
    //     acc[curr.namaCustomer] = {
    //       date: curr.date,
    //       namaCustomer: curr.namaCustomer,
    //       items: [],
    //     };
    //   }
    //   acc[curr.namaCustomer].items.push({
    //     itemCode: curr.itemCode,
    //     quantity: curr.quantity,
    //     price: curr.price,
    //     totalUSD: curr.totalUSD,
    //   });
    //   return acc;
    // }, {});

    // const finalResult = Object.values(formattedResult);
    // return finalResult;

    return result.recordset;
  } catch (errror) {
    console.error();
    return errror;
  }
}

// ini getAktualSales ori
// async function getAktualSales() {
//   try {
//     await sql.connect(config);
//     let now = getFormatDate(new Date());
//     let start = getFormatDate(new Date(), true);
//     let queries = `SELECT
//           T0.[DocDate] as 'date',
//           T0.[CardName] as 'namaCustomer',
//           T1.[itemCode],
//           T1.[Quantity] - ISNULL(v.[quantity], 0) - ISNULL(x.[quantity], 0) AS [quantity],
//           T1.Price as 'price',
//           CASE
//               WHEN T1.Currency = 'IDR' THEN T1.Price * T1.Quantity / f.Rate
//               WHEN T1.Currency = 'JPY' THEN T1.Price * T1.Quantity / f.Rate
//               ELSE T1.Price * T1.Quantity
//           END AS 'totalUSD'
//       FROM
//           ODLN T0
//           INNER JOIN DLN1 T1 ON T0.[DocEntry] = T1.[DocEntry]
//           LEFT JOIN (
//               SELECT
//                   baseentry,
//                   basetype,
//                   baseline,
//                   SUM(quantity) AS [quantity]
//               FROM
//                   rdn1 WITH (NOLOCK)
//               GROUP BY
//                   baseentry,
//                   basetype,
//                   baseline
//           ) v ON v.BaseEntry = T1.DocEntry
//           AND v.BaseType = T1.ObjType
//           AND v.BaseLine = T1.LineNum
//           LEFT JOIN (
//               SELECT
//                   a.baseentry,
//                   a.basetype,
//                   a.baseline,
//                   SUM(b.quantity) AS [quantity]
//               FROM
//                   inv1 a WITH (NOLOCK)
//                   LEFT JOIN RIN1 b WITH (NOLOCK) ON a.DocEntry = b.BaseEntry
//                   AND a.ObjType = b.BaseType
//                   AND a.LineNum = b.BaseLine
//               GROUP BY
//                   a.baseentry,
//                   a.basetype,
//                   a.baseline
//           ) x ON x.BaseEntry = T1.DocEntry
//           AND x.BaseType = T1.ObjType
//           AND x.BaseLine = T1.LineNum
//           LEFT JOIN ortt f ON T1.Currency = f.Currency
//           AND T1.DocDate = f.RateDate
//       WHERE
//           T0.DocDate >= '${start}'
//           AND T0.DocDate <= '${now}'
//           AND (
//               T1.LineStatus = 'O'
//               OR (T0.CANCELED NOT IN ('Y', 'C'))
//               OR (
//                   T1.LineStatus = 'C'
//                   AND ISNULL(t1.Targettype, '-1') NOT IN ('-1', '15')
//                   AND ISNULL(t1.TrgetEntry, '') <> ''
//               )
//           )
//           AND (
//               T1.[Quantity] - ISNULL(v.[quantity], 0) - ISNULL(x.[quantity], 0)
//           ) <> 0
//           order by CardName asc`;
//     let result = await sql.query(queries);

//     let formattedResult = result.recordset.reduce((acc, curr) => {
//       if (!acc[curr.namaCustomer]) {
//         acc[curr.namaCustomer] = {
//           date: curr.date,
//           namaCustomer: curr.namaCustomer,
//           items: [],
//         };
//       }
//       acc[curr.namaCustomer].items.push({
//         itemCode: curr.itemCode,
//         quantity: curr.quantity,
//         price: curr.price,
//         totalUSD: curr.totalUSD,
//       });
//       return acc;
//     }, {});

//     const finalResult = Object.values(formattedResult);
//     return finalResult;

//     // return result.recordset;
//   } catch (errror) {
//     console.error();
//     return errror;
//   }
// }

async function getTargetSales() {
  try {
    await sql.connect(config);
    let now = getFormatDate(new Date());
    let queries = `SELECT
          Datepart (yy, b.Date) as tahun,
          DATENAME(MONTH, b.Date)AS bulan,
          d. CardName as 'namaCustomer',
          b. itemCode,
          b. quantity,
  
          c. price ,
          CASE
          WHEN c.currency = 'IDR' THEN c.price * b.quantity / f.rate
          WHEN c.currency = 'JPY' THEN c.price * b.quantity / f.rate
          ELSE c.price * b.quantity
  
          END AS 'totalUSD'
  
          from ofct a
          left join FCT1 b on a.AbsID = b.AbsID
          left join itm1 c on b.ItemCode = c.ItemCode
          left join ocrd d on a.Name = d.CardCode
          left join ortt f on c.currency = f.currency and b.Date = f.RateDate
          left join oitm g on b.itemcode = g.itemcode
  
          WHERE
          b.Date >= '10-01-2023' and b.Date <= '${now}'
          and
          c.PriceList = 1
          and
          g.Validfor = 'Y'
  
          order by CardName asc`;
    let result = await sql.query(queries);

    let formattedResult = result.recordset.reduce((acc, curr) => {
      if (!acc[curr.namaCustomer]) {
        acc[curr.namaCustomer] = {
          namaCustomer: curr.namaCustomer,
          periode: curr.bulan,
          items: [],
        };
      }
      acc[curr.namaCustomer].items.push({
        itemCode: curr.itemCode,
        quantity: curr.quantity,
        price: curr.price,
        totalUSD: curr.totalUSD,
      });
      return acc;
    }, {});

    const finalResult = Object.values(formattedResult);

    return finalResult;
  } catch (errror) {
    console.error();
    return errror;
  }
}

async function getTotalSales() {
  try {
    let now = getFormatDate(new Date());
    let start = getFormatDate(new Date(), true);
    let queries = `SELECT
    Target.tahun AS tahun,
    Target.bulan AS bulan,
	Target.namaCustomer1,
	Target.totalTargetQuantity,
    Aktual.totalAktualQuantity,
    Target.totalTargetUSD,
	Aktual.totalAktualUSD
FROM
    (SELECT
        T0.[CardName] as 'namaCustomer',
        SUM(T1.[Quantity] - ISNULL(v.[quantity], 0) - ISNULL(x.[quantity], 0)) AS totalAktualQuantity,
        SUM(
            CASE
                WHEN T1.Currency = 'IDR' THEN T1.Price * T1.Quantity / f.Rate
                WHEN T1.Currency = 'JPY' THEN T1.Price * T1.Quantity / f.Rate
                ELSE T1.Price * T1.Quantity
            END
        ) AS totalAktualUSD
    FROM
        ODLN T0
        INNER JOIN DLN1 T1 ON T0.[DocEntry] = T1.[DocEntry]
        LEFT JOIN (
            SELECT
                baseentry,
                basetype,
                baseline,
                SUM(quantity) AS [quantity]
            FROM
                rdn1 WITH (NOLOCK)
            GROUP BY
                baseentry,
                basetype,
                baseline
        ) v ON v.BaseEntry = T1.DocEntry
        AND v.BaseType = T1.ObjType
        AND v.BaseLine = T1.LineNum
        LEFT JOIN (
            SELECT
                a.baseentry,
                a.basetype,
                a.baseline,
                SUM(b.quantity) AS [quantity]
            FROM
                inv1 a WITH (NOLOCK)
                LEFT JOIN RIN1 b WITH (NOLOCK) ON a.DocEntry = b.BaseEntry
                AND a.ObjType = b.BaseType
                AND a.LineNum = b.BaseLine
            GROUP BY
                a.baseentry,
                a.basetype,
                a.baseline
        ) x ON x.BaseEntry = T1.DocEntry
        AND x.BaseType = T1.ObjType
        AND x.BaseLine = T1.LineNum
        LEFT JOIN ortt f ON T1.Currency = f.Currency
        AND T1.DocDate = f.RateDate
    WHERE
        T0.DocDate >= '${start}'
        AND T0.DocDate <= '${now}'
        AND (
            T1.LineStatus = 'O'
            OR (T0.CANCELED NOT IN ('Y', 'C'))
            OR (
                T1.LineStatus = 'C'
                AND ISNULL(t1.Targettype, '-1') NOT IN ('-1', '15')
                AND ISNULL(t1.TrgetEntry, '') <> ''
            )
        )
        AND (
            T1.[Quantity] - ISNULL(v.[quantity], 0) - ISNULL(x.[quantity], 0)
        ) <> 0

    GROUP BY T0.[CardName]) AS Aktual
JOIN
    (SELECT
		d.U_MIS_InCusName as 'namaCustomer1',
        DATEPART(yy, b.Date) AS tahun,
        DATENAME(MONTH, b.Date) AS bulan,
        d.CardName AS 'namaCustomer',
        SUM(b.quantity) AS totalTargetQuantity,
        SUM(
            CASE
                WHEN c.currency = 'IDR' THEN c.price * b.quantity / f.rate
                WHEN c.currency = 'JPY' THEN c.price * b.quantity / f.rate
                ELSE c.price * b.quantity
            END
        ) AS totalTargetUSD
    FROM ofct a
    LEFT JOIN FCT1 b ON a.AbsID = b.AbsID
    LEFT JOIN itm1 c ON b.ItemCode = c.ItemCode
    LEFT JOIN ocrd d ON a.Name = d.CardCode
    LEFT JOIN ortt f ON c.currency = f.currency AND b.Date = f.RateDate
    LEFT JOIN oitm g ON b.itemcode = g.itemcode

	
    WHERE
        b.Date >= '${start}' AND b.Date <= '${now}'
        AND c.PriceList = 1
        AND g.Validfor = 'Y'
    GROUP BY DATEPART(yy, b.Date), DATENAME(MONTH, b.Date), d.CardName, d.U_MIS_InCusName) AS Target
ON Aktual.namaCustomer = Target.namaCustomer;`;
    await sql.connect(config);
    let result = await sql.query(queries);

    return result.recordset;
  } catch (error) {
    console.error();
    return error;
  }
}
async function getEachCustomer(eachCustomer) {
    const customer = eachCustomer
  try {
    await sql.connect(config);
    let now = getFormatDate(new Date());
    let start = getFormatDate(new Date(), true);
    let queries = `SELECT
          T0.[DocDate] as 'date',
          T0.[CardName] as 'namaCustomer',
          T1.[itemCode],
          T1.[Quantity] - ISNULL(v.[quantity], 0) - ISNULL(x.[quantity], 0) AS [quantity],
          T1.Price as 'price',
          CASE
              WHEN T1.Currency = 'IDR' THEN T1.Price * T1.Quantity / f.Rate
              WHEN T1.Currency = 'JPY' THEN T1.Price * T1.Quantity / f.Rate
              ELSE T1.Price * T1.Quantity
          END AS 'totalUSD'
      FROM
          ODLN T0
          INNER JOIN DLN1 T1 ON T0.[DocEntry] = T1.[DocEntry]
          LEFT JOIN (
              SELECT
                  baseentry,
                  basetype,
                  baseline,
                  SUM(quantity) AS [quantity]
              FROM
                  rdn1 WITH (NOLOCK)
              GROUP BY
                  baseentry,
                  basetype,
                  baseline
          ) v ON v.BaseEntry = T1.DocEntry
          AND v.BaseType = T1.ObjType
          AND v.BaseLine = T1.LineNum
          LEFT JOIN (
              SELECT
                  a.baseentry,
                  a.basetype,
                  a.baseline,
                  SUM(b.quantity) AS [quantity]
              FROM
                  inv1 a WITH (NOLOCK)
                  LEFT JOIN RIN1 b WITH (NOLOCK) ON a.DocEntry = b.BaseEntry
                  AND a.ObjType = b.BaseType
                  AND a.LineNum = b.BaseLine
              GROUP BY
                  a.baseentry,
                  a.basetype,
                  a.baseline
          ) x ON x.BaseEntry = T1.DocEntry
          AND x.BaseType = T1.ObjType
          AND x.BaseLine = T1.LineNum
          LEFT JOIN ortt f ON T1.Currency = f.Currency
          AND T1.DocDate = f.RateDate
      WHERE
      T0.[CardName] = '${eachCustomer}' and
          T0.DocDate >= '${start}'
          AND T0.DocDate <= '${now}'
          AND (
              T1.LineStatus = 'O'
              OR (T0.CANCELED NOT IN ('Y', 'C'))
              OR (
                  T1.LineStatus = 'C'
                  AND ISNULL(t1.Targettype, '-1') NOT IN ('-1', '15')
                  AND ISNULL(t1.TrgetEntry, '') <> ''
              )
          )
          AND (
              T1.[Quantity] - ISNULL(v.[quantity], 0) - ISNULL(x.[quantity], 0)
          ) <> 0
          order by CardName asc`;
    let result = await sql.query(queries);

    let formattedResult = result.recordset.reduce((acc, curr) => {
      if (!acc[curr.namaCustomer]) {
        acc[curr.namaCustomer] = {
          date: curr.date,
          namaCustomer: curr.namaCustomer,
          items: [],
        };
      }
      acc[curr.namaCustomer].items.push({
        itemCode: curr.itemCode,
        quantity: curr.quantity,
        price: curr.price,
        totalUSD: curr.totalUSD,
      });
      return acc;
    }, {});

    const finalResult = Object.values(formattedResult);
    return finalResult;

  } catch (errror) {
    console.error();
    return errror;
  }
}

module.exports = { getAktualSales, getTargetSales, getTotalSales, getEachCustomer };