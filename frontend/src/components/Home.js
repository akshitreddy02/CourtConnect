import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='complete'>
            <div className="heading">
                <h1 className="main-heading">eVault System for Legal Records</h1>
                <h3 className="third">
                    Building a secure, transparent, and accessible legal records platform
                </h3>
                <div className='clicker'><button onClick={() => navigate('/login')}>Login</button></div>
            </div>

            <div className="mains-content">
                <div className="cardy">
                    <h1 className="main-heading">Objective</h1>
                    <p className="para">
                        The objective of this hackathon is to develop a blockchain-based
                        eVault system for legal records that ensures security, transparency,
                        and accessibility for all stakeholders.
                    </p>
                </div>

                <div className="cardy">
                    <h1 className="main-heading">Requirements</h1>
                    <p className="para">
                        1. The eVault system should be based on a blockchain platform such as
                        Ethereum, Hyperledger, or Corda, using smart contracts for access,
                        permissions, and transactions.
                        <br />
                        2. User-friendly interfaces for lawyers, judges, clients, and
                        stakeholders with features like document upload, retrieval, and
                        information sharing. <br />
                        3. Privacy and confidentiality of legal records ensured with access
                        controls, encryption, and authentication mechanisms. <br />
                        4. Seamless integration with existing legal databases and case
                        management systems for interoperability. <br />
                        5. Scalable and adaptable to accommodate future changes and upgrades.
                    </p>
                </div>

                <div className="cardy">
                    <h1 className="main-heading">Expected Outcomes</h1>
                    <p className="para">
                        1. Functional prototype of the blockchain-based eVault system.
                        <br />
                        2. Detailed design document outlining architecture, features, and
                        technical specifications. <br />
                        3. Business plan outlining impact, market opportunities, and revenue
                        models. <br />
                        4. Presentation of the prototype, design document, and business plan.
                    </p>
                </div>

                <div className="cardy">
                    <h1 className="main-heading">About Us</h1>
                    <p className="para">
                        We are a passionate team of innovators dedicated to revolutionizing
                        the legal records management landscape. Our mission is to provide a
                        secure, transparent, and accessible platform for legal records,
                        enhancing the efficiency of the justice system.
                    </p>
                </div>

                <div className="cardy">
                    <h1 className="main-heading">Why Use Me</h1>
                    <p className="para">
                        Our eVault system offers a cutting-edge solution to legal records
                        management, ensuring a seamless experience for lawyers, judges,
                        clients, and stakeholders. From smart contract-based access control
                        to user-friendly interfaces, we prioritize security, transparency,
                        and ease of use.
                    </p>
                </div>
            </div>

            <div className="ankle">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis recusandae tempore repudiandae. Vero dolore deserunt dolorem, accusamus repellat facere cum nihil quisquam placeat laudantium. Id debitis voluptatibus dolore laudantium natus ex repellendus blanditiis quo, aperiam libero eos numquam quam recusandae, inventore molestias repellat culpa itaque explicabo aut incidunt autem excepturi vel quis at. Sit mollitia voluptas tenetur, itaque necessitatibus unde quam aut molestias facere autem adipisci placeat velit explicabo quisquam ut, illum labore qui obcaecati quasi provident! Doloribus quisquam quibusdam repellendus! Rem aspernatur officia, labore ab ipsam odit impedit reprehenderit sequi ipsum culpa dicta minima voluptatibus, obcaecati nesciunt ex corrupti.</p>
                <h4>Contact us at: evault123@gmail.com</h4>
            </div>
        </div>
    );
};

export default Home;
