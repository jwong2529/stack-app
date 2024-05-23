import React from 'react';
import './HomePage.css';
import Banner from '../../components/Banner/Banner';
import NewStackButton from '../../components/NewStackButton/NewStackButton';
import StackCard from '../../components/StackCard/StackCard';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <Banner/>
            <NewStackButton/>
            <div className="stacks-container">
                My Stacks
                <div className="stack-card-list">
                    <StackCard/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;