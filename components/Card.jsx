import React from "react";
import styled from "styled-components";

const Card = ({ icon, title, description }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <div className="content">
            <div className="icon">{icon}</div>
            <h3 className="title">{title}</h3>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: linear-gradient(163deg, #34d399 0%, #65a30d 100%);
    background-size: 300% 300%;
    padding: 2px;
  }

  .card2 {
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    border-radius: 18px;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
  }

  .card:hover {
    transform: scale(1.02);
    background-size: 200% 200%;
    background-position: center;
    box-shadow: 0px 0px 20px 10px #14532d;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .icon {
    font-size: 40px;
    color: #00ff75;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }

  .description {
    font-size: 1rem;
    color: #bbb;
  }
`;

export default Card;
