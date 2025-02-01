import prisma from '@/src/libs/prismadb'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default async function getDataForGraph() {
    try {
        //Defining the data range 
        const startDate = dayjs().subtract(6, 'days').startOf('day');
        const endDate = dayjs().endOf('day');

        //Fetching the orderData Group by day
        const orderData = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString()
                },
                status: 'succeeded',
            },
            select: {
                createdAt: true,
                amount: true
            }
        })
        //Aggregate the data by the date
        const aggregatedData: Record<string, { day: string; date: string; totalAmount: number }> = {};
        let currDate = startDate;
        //looping through the dates 
        while (currDate.isBefore(endDate) || currDate.isSame(endDate, 'day')) {
            const day = currDate.format('dddd');
            aggregatedData[currDate.format('YYYY-MM-DD')] = {
                day,
                date: currDate.format('YYYY-MM-DD'),
                totalAmount: 0
            };
            currDate = currDate.add(1, 'day') //move to the next day
        };


        //sum of totalAmount  for each day 
        orderData.forEach((order) => {
            const date = dayjs(order.createdAt).format('YYYY-MM-DD');
            if (aggregatedData[date]) {
                aggregatedData[date].totalAmount += order.amount || 0;
            }
        });

        //Return the sorted result 
        return Object.values(aggregatedData).sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));


    } catch (err: any) {
        throw new Error(err);
    }
}