import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const interestsData = [
  "Movies&TVshows",
  "Music",
  "Mixer",
  "Beauty",
  "Oralcare",
  "Speakers",
  "Haircare",
  "Toaster",
  "Cooker",
  "Tablets",
  "Laptop",
  "Computer",
  "Television",
  "Mobiles",
  "Spa",
  "AllInOne",
];

const InterestModal = ({ show, onHide, onSave }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };

  const handleSave = () => {
    // onSave(selectedInterests);
    // onHide();

    let interests = selectedInterests.slice();
    while (interests.length < 3) {
      interests.push(null);
    }
    onSave(interests);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Interests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {interestsData.map((interest) => (
          <Button
            key={interest}
            variant={
              selectedInterests.includes(interest)
                ? "primary"
                : "outline-primary"
            }
            onClick={() => handleInterestClick(interest)}
            style={{ margin: "5px" }}
            disabled={
              selectedInterests.length === 3 &&
              !selectedInterests.includes(interest)
            }
          >
            {interest}
          </Button>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={selectedInterests.length === 0}
        >
          Save Interests
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InterestModal;
