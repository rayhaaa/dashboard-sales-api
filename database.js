const sql = require("mssql");
const config = require("./dbConfig");

async function getAktualSales() {
  try {
    const query = `SELECT
    T0.[DocDate] as 'date',
    T0.[CardName] as 'namaCustomer',
    T1.[ItemCode],
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
    T0.DocDate >= '2023-09-01'
    AND T0.DocDate <= '2023-09-30'
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
ORDER BY
    T1.[ItemCode]`;
    await sql.connect(config);
    let result = await sql.query(query);

    return result.recordset;
  } catch (errror) {
    console.error();
    return errror;
  }
}

async function getTargetSales() {
  try {
    // await sql.connect(config);
    const query = `SELECT
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
    b.Date >= '09-01-2023' and b.Date <= '09-30-2023'
    and
    c.PriceList = 1
    and
    g.Validfor = 'Y'
    
    order by b.Date`;
    let result = await sql.query(query);

    return result.recordset;
  } catch (errror) {
    console.error();
    return error;
  }
}

module.exports = { getAktualSales, getTargetSales };
