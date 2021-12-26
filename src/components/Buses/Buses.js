import React from 'react';
import { useState, useEffect } from 'react';
import BusCard from '../Home/BusCard'
import SearchBus from './SearchBus'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Buses = (props) => {
    let all_bus_info = [];
    const [fetched_bus, set_fetched_bus] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://akib-server.herokuapp.com/allBus', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                set_fetched_bus(data);
                setLoading(false)
            })
    }, []);

    //-------------------- Making a Graph from the fetched data --------------------

    let graph = [[]]
    for (var i = 0; i < 1000; i++) {
        graph.push([])
    }
    let cnt = 1;
    let string_to_num = [];
    let num_to_string = [];

    for (let i = 0; i < fetched_bus.length; i++) { // give all location string to a numaric value
        let route = [[]]
        route = fetched_bus[i].route
        for (let j = 0; j < route.length; j++) {
            let u = route[j][0]
            let v = route[j][1]
            if (!string_to_num[v] && v) {
                string_to_num[v] = cnt;
                num_to_string[cnt] = v;
                //console.log(v);
                //console.log(cnt);
                cnt++;
            }
            if (!string_to_num[u] && u) {
                string_to_num[u] = cnt;
                num_to_string[cnt] = u;
                cnt++;
            }
        }
    }

    // make adjacency list
    for (let i = 0; i < fetched_bus.length; i++) {
        let route = [[]]
        route = fetched_bus[i].route
        for (let j = 0; j < route.length; j++) {
            let u = string_to_num[route[j][0]]
            let v = string_to_num[route[j][1]]
            if (u && v) {
                let w = parseInt(route[j][2]);
                graph[u][v] = w;
                graph[v][u] = w;
            }
            //let w = parseInt(route[j][2]);
            //graph[u][v] = graph[v][u] = 1;
            //console.log(string_to_num[route[j][0]])
            //console.log(route[j][0])
        }
    }
    //console.log(graph[121][25])

    //-------------------------------------------------------------------------------

    for (let i = 0; i < fetched_bus.length; i++) {
        all_bus_info.push(<BusCard name={fetched_bus[i].bus_name} image={fetched_bus[i].bus_image} route={fetched_bus[i].route} service={fetched_bus[i].bus_service} fair={fetched_bus[i].bus_base_fair} />);
    }
    let to = props.to;
    let from = props.from;

    if (isLoading) {
        return (
            <>
                <br /><br /><br />
                <CircularProgress /><br />দয়া করে অপেক্ষা করুন
            </>
        )
    }

    if (to != from) {
        // --------------------- search for bus ---------------------------------

        let to_num = string_to_num[to]
        let from_num = string_to_num[from]

        //console.log(to_num)
        //console.log(from_num)

        let queue = [];
        let vis = [];
        let dir = [];
        queue.push(from_num);
        vis[from_num] = true;
        while (queue.length != 0) {
            let u = queue[0];
            queue.shift();
            let f = 0;
            for (let v = 0; v < cnt + 10; v++) {
                if (graph[u][v] != undefined && vis[v] == undefined) {
                    vis[v] = true;
                    dir[v] = u;
                    if (v == to_num) {
                        f = 1;
                        break;
                    }
                    queue.push(v);
                }
            }
            if (f) break;
        }

        let path = [];
        let tmp = to_num;
        while (tmp != from_num) {
            path.push(tmp)
            tmp = dir[tmp];
        }
        path.push(from_num);
        path.reverse();

        /*for (let i = 0; i < path.length; i++) {
            console.log(path[i])
            console.log(num_to_string[path[i]])
        }*/


        // search for direct bus
        let km = 0;
        let direct_bus = [];

        for (let i = 0; i < fetched_bus.length; i++) {
            let route = [[]]
            route = fetched_bus[i].route
            let complete = false;
            km = 0
            let d = []

            for (let j = 0; j < route.length; j++) {
                let u = string_to_num[route[j][0]]
                let v = string_to_num[route[j][1]]
                if (u == from_num) {
                    for (let k = j; k < route.length; k++) {
                        u = string_to_num[route[k][0]]
                        v = string_to_num[route[k][1]]
                        if (u && v) {
                            km += graph[u][v];
                            d.push(num_to_string[u]);
                            if (v == to_num) {
                                complete = true;
                                d.push(num_to_string[v]);
                                break;
                            }
                        }

                    }
                }
                if (complete) break;
            }
            if (!complete) {
                //console.log("here")
                km = 0
                for (let j = route.length - 1; j >= 0; j--) {
                    let u = string_to_num[route[j][0]]
                    let v = string_to_num[route[j][1]]
                    if (v == from_num) {
                        for (let k = j; k >= 0; k--) {
                            u = string_to_num[route[k][0]]
                            v = string_to_num[route[k][1]]
                            if (u && v) {
                                d.push(num_to_string[v]);
                                km += graph[v][u];
                                if (u == to_num) {
                                    complete = true;
                                    console.log(fetched_bus[i].bus_name)
                                    console.log("complete = " + complete)
                                    console.log("km = " + km)
                                    d.push(num_to_string[u]);
                                    break;
                                }
                            }

                        }
                    }
                    if (complete) break;
                }
            }
            //console.log("km  = " + km)
            //console.log("complete  = " + complete)
            //console.log("bus  = " + fetched_bus[i].bus_name)
            if (complete) {
                direct_bus.push(<SearchBus path={d} half_pass_amount={fetched_bus[i].half_pass_amount} half_pass={fetched_bus[i].half_pass} base_fair={fetched_bus[i].bus_base_fair} id={fetched_bus[i]._id} type={fetched_bus[i].bus_type} name={fetched_bus[i].bus_name} image={fetched_bus[i].bus_image} route={fetched_bus[i].route} service={fetched_bus[i].bus_service} km={km} />)
                //console.log(d)
            }
        }



        // ---------------------------------------------------------------------



        return (
            <>
                <h1>{from} - {to}</h1>
                <div className='container'>
                    {direct_bus.length ? direct_bus : <h1 style={{ color: 'red' }}>No Direct Bus Found</h1>}
                </div>
            </>
        )
    }

    return (
        <>
            <h1>সকল বাসের তথ্য</h1><br />
            <div className='container'>
                {all_bus_info}
            </div>
        </>
    );
};

export default Buses;