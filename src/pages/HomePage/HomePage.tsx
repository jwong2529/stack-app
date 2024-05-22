import React from 'react';
import Banner from '../../components/Banner/Banner';
import NewStackButton from '../../components/NewStackButton/NewStackButton';

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <Banner/>
            <NewStackButton/>
        </div>
    );
};

export default HomePage;