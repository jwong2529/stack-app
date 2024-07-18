import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './HomePage.css';
import Banner from '../../components/Banner/Banner';
import StackCard from '../../components/StackCard/StackCard';
import CreateStackModal from '../../components/CreateStackModal/CreateStackModal';

interface Item {
    id: number;
    type: string;
    content: string;
}

interface Stack {
    uuid: string;
    title: string;
    description: string;
    items: Item[];
}

const HomePage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [stacks, setStacks] = useState<Stack[]>([]);

    const fetchStacks = async() => {
        try {
            const response = await axios.get('http://localhost:8000/api/stacks');
            setStacks(response.data);
        } catch (error) {
            console.error('Error fetching stacks:', error);
        }
    };

    useEffect(() => {
        fetchStacks();
    }, []);

    const addStack = async (newStack: { title: string; description: string; items: { type: string; content: string }[] }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/stacks', newStack);
            setStacks([...stacks, response.data]);
        } catch (error) {
            console.error('Error adding stack:', error);
        }
    }

    return (
        <div className="home-container">
            <Banner/>
            <button onClick={() => setShowModal(true)} className="new-stack-button">
                Create new stack
            </button>
            <div className="stacks-container">
                My Stacks
                <div className="stack-card-list">
                    {stacks.map((stack) => (
                        <StackCard key={stack.uuid} stack = {stack} />
                    ))}
                </div>
            </div>
            <CreateStackModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                addStack={addStack}
            />
        </div>
    );
};

export default HomePage;