import React, { useEffect, useState } from 'react';
import { PARTICIPANTS } from '@/constants';
import {WheelComponent} from '@/components/molecules/Wheel';

const Wheel = () => {
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [numGroups, setNumGroups] = useState(5);
  const [groups, setGroups] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [openSetupNameGroup, setOpenSetupNameGroup] = useState(false);

  const handleRandomize = () => {
    console.log('111')
    const wheel = document.getElementById('inner-wheel');
    const randomDegree = Math.floor(Math.random() * 360) + 720; // At least 2 full spins
    wheel.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
    wheel.style.transform = `rotate(${randomDegree}deg)`;
    setTimeout(() => {
      wheel.style.transition = '';
      wheel.style.transform = '';
      setShowModal(true);
    }, 3000);
    const names = participants.split('\n').filter(name => name.trim() !== '');
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const newGroups = Array.from({ length: numGroups }, () => []);
    shuffled.forEach((name, index) => {
      newGroups[index % numGroups].push(name);
    });
    console.log(newGroups)
    setGroups(newGroups);
  };

  const handleFileLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File content:', e.target.result);
        setParticipants(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleFileSave = () => {
    const blob = new Blob([participants], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'participants.txt';
    link.click();
  };

  useEffect(() => {
    console.log(numGroups)
    setGroupNames((prev) => {
      const newGroupNames = [...prev];
      if (newGroupNames.length === 0) {
        Array.from({ length: numGroups }, (_, index) => {
          if (newGroupNames[index] === undefined) {
            newGroupNames[index] = `Group ${index + 1}`;
          }
        });
        return newGroupNames;
      } else {
        if (newGroupNames.length < numGroups) {
          newGroupNames.push(`Group ${newGroupNames.length + 1}`);
        } else {
          newGroupNames.splice(numGroups);
        }
        return newGroupNames;
      }
      
    });
  }, [numGroups]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '80vw', margin: '0 auto', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap' }}>
      
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Wheel - Random Group Generator</h1>
        <textarea
          rows="10"
          cols="30"
          placeholder="Enter participant names, one per line"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '15px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
          }}
        />
        <div style={{ marginBottom: '15px', display: 'flex',  justifyContent: 'space-between', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Number of Groups:
            <input
              type="number"
              min="2"
              value={numGroups}
              onChange={(e) => {
                setNumGroups(Number(e.target.value))
              }}
              style={{
                marginLeft: '10px',
                width: '60px',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '14px',
              }}
            />
          </label>

          <button
            onClick={() => setOpenSetupNameGroup(!openSetupNameGroup)}
            style={{
              padding: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {openSetupNameGroup ? 'Hide Group Names' : 'Setup Group Names'}
          </button>
        </div>
        {openSetupNameGroup && <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }} >
          {Array.from({ length: numGroups }, (_, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '16px', fontWeight: 'bold' }}>
                Group {index + 1} Name:
              </label>
              <input
                type="text"
                defaultValue={groupNames[index] || `Group ${index + 1}`}
                onChange={(e) => {
                  setGroupNames((prev) => {
                    prev[index] = e.target.value;
                    return prev
                  });
                }}
                style={{
                  flex: 1,
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '14px',
                }}
              />
            </div>
          ))}
        </div>}
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' }}>
          {/* <button
            onClick={handleRandomize}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Randomize Now
          </button> */}
          <input
            type="file"
            accept=".txt,.csv"
            onChange={handleFileLoad}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '14px',
            }}
          />
          <button
            onClick={handleFileSave}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Save List
          </button>
        </div>
        
         {groups.length > 0 && (<button
            onClick={() => setShowModal(true)}
            style={{
              padding: '10px',
              backgroundColor: '#FF5722',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            View Groups
          </button>)}
          {groups.length > 0 && showModal && (
            <div
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '1000',
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  maxWidth: '600px',
                  width: '90%',
                  maxHeight:'80vh',
                  overflowY: 'auto',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
                <div style={{ marginTop: '20px' }}>

                <button
                    onClick={() => {
                      const textToCopy = groups
                        .map((group, index) => `Group ${groupNames[index]}: ${group.join(', ')}`)
                        .join('\n');
                      navigator.clipboard.writeText(textToCopy).then(() => {
                        alert('Groups copied to clipboard!');
                      });
                    }}
                    style={{
                      padding: '10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginBottom: '20px',
                    }}
                  >
                    <span>Copy Groups</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      width="16px"
                      height="16px"
                    >
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                  </button>
                  <h2 style={{ textAlign: 'center', color: '#FF5722' }}>Groups</h2>

                  {groupNames.map((groupName, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '15px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                      }}
                    >
                      <h3 style={{ color: '#3F51B5' }}>{groupName}</h3>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const draggedName = e.dataTransfer.getData('text/plain');
                          const targetGroupIndex = index;
                          const updatedGroups = groups.map((group, i) =>
                            i === targetGroupIndex
                              ? [...group, draggedName]
                              : group.filter((name) => name !== draggedName)
                          );
                          setGroups(updatedGroups);
                        }}
                      >
                        {groups[index].map((name, i) => (
                          <li
                            key={i}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData('text/plain', name)}
                            style={{
                              fontSize: '14px',
                              lineHeight: '1.5',
                              cursor: 'grab',
                              backgroundColor: '#f9f9f9',
                              padding: '5px',
                              marginBottom: '5px',
                              borderRadius: '3px',
                              border: '1px solid #ccc',
                            }}
                          >
                            {name}
                          </li>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#FF5722' }}>TeamUp</h2>
        <p style={{marginBottom: '10px'}}>click sprint button to run Generator</p>
        <WheelComponent participants={participants.split('\n').filter(name => name.trim() !== '')} handleRandomize={handleRandomize}/>
      </div>
    </div>
  );
};

export default Wheel;