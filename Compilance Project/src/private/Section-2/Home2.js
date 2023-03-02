/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import Compilance_items from '../Section-1/Compilance-items';
import '../App.css'
import Donut from './Donut';

function Home2() {
    return (
        <div>
            <div className="section-2-container">
                        <div className="pie-chart-section">
                           <Donut className="donut-pie-chart"/>

                        </div>
                        <div className="people-tags-section">
                                <div className="people-tags-items-1">
                                    <h1>People</h1>
                                    <p>View All &gt;</p>
                                </div>
                                <div className="people-tags-items-2">
                                        <div className="people-tags-image-1 "></div>
                                        <div className="people-tags-image-1 people-img-2"></div>
                                        <div className="people-tags-image-1 people-img-3">
                                            <p>25+</p>
                                        </div>
                                </div>
                        </div>
                        <div className="today-compilance-section">
                                <div className="today-tags-items-1">
                                    <h1>Today</h1>
                                    <p>View All &gt;</p>
                                </div>
                                <div className="today-tags-items-2">
                                    <Compilance_items  top="-80px" right="50px"  className="compilance-small-item" width="91%"/>
                                    <Compilance_items  top="-80px" right="50px"  className="compilance-small-item" width="91%"/>
                                    <Compilance_items  top="-140px" right="50px"  className="compilance-small-item" width="91%"/>
                                </div>
                        </div>
                </div>    
        </div>
    )
}

export default Home2
