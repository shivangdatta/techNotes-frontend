import React from 'react';
import './FloatingStickyNote.css'; // Import your CSS file for styling

const FloatingStickyNote = () => {
  return (
    <div className="floating-sticky-note">
      <img
        className="leaf"
        src="path_to_your_leaf_image.png"
        alt="Leaf"
      />
      {/* Add content inside the sticky note if needed */}
    </div>
  );
}

export default FloatingStickyNote;
