import React, { useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css"
import { Icon, } from 'leaflet'
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    Title, Tooltip, PointElement, Legend, LineElement
} from 'chart.js'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
const Coronacases = () => {
    const [allcases, setAllcases] = useState<any[]>([])
    const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });
    //getting All cases
    const getCases = () => {
        const url = 'https://disease.sh/v3/covid-19/countries'
        axios.get(url)
            .then((response) => {
                const data = response.data;
                setAllcases(data)
            });
    };
    useEffect(() => getCases(), []);

    // getting Line Data

    useEffect(() => {


        axios.get(
            "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        ).then((res) => {

            const data = res.data

            const newChartData = {
                labels: Object.keys(data.cases),
                datasets: [
                    {
                        label: "Cases",
                        data: Object.values(data.cases),
                        fill: false,
                        borderColor: "#000",
                        borderWidth: 0.5,
                    },
                ],
            };

            setChartData(newChartData);
        })


        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );

    }, []);
    // custom icons
    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/149/149059.png",
        iconSize: [38, 38]
    })
    return (
        <div>
            <div className="text-center">
                <h1 className='text-2xl p-4 font-semibold'>Cases Line Chart</h1>
            </div>
            <div className="border-0 px-4 py-4 border-red-100 w-11/12  m-auto 10 auto 10" >
                {
                    chartData.datasets ? <Line options={{
                    }} data={chartData} /> : <h1 className=" mb-4 font-bold text-2xl">Loading...</h1>
                }
            </div>
            <div className="text-center">
                <h1 className='text-2xl p-4 font-semibold'>World's Case analysis</h1>
            </div>
            <MapContainer scrollWheelZoom={false} className='p-4' center={[20, 77]} zoom={4}>
                <TileLayer
                    attribution='&copy; <a href="https://www.osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    allcases.map(cses => (
                        <Marker key={cses.countryInfo.id} icon={customIcon} position={[cses.countryInfo.lat, cses.countryInfo.long]}>
                            <Popup>
                                Country: <b>{cses.country}</b> <br />
                                Active: {cses.active}<br />
                                Recoveres Cases:{cses.recovered}<br />
                                Death:{cses.deaths}
                            </Popup>
                        </Marker>
                    ))
                }

            </MapContainer>
        </div>
    )
}

export default Coronacases