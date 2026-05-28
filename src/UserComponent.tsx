const UserComponent = ({name,family,dateOfBirth,major,specialty}) => {
    
    const age = new Date().getFullYear() - dateOfBirth;
    return (
        <div style={{
            gap:'20px',
            display:"flex",
             backgroundColor:'#ffffff',
             borderRadius:"15px" 
             ,padding:'20px',
              flexDirection:'column'
              }} >
            <p><strong>Name:</strong> {name || "Unknown"}</p>
            <p><strong>Family :</strong> {family || "Unknown"} </p>
            <p><strong>DateOfBirth :</strong> {dateOfBirth || "Not provided"} (Age: {age} years old)</p>
            <p><strong>Major :</strong> {major || "Not specified"} </p>
            <p><strong>Specialty :</strong> {specialty || "Not specified"} </p>
        </div>
    );
};

export default UserComponent;