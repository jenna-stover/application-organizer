import '../styles/AddForm.css'

const AddForm = ( {onAddProspect }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/prospects/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error posting data");
      }
  
      const prospect = await response.json();
      form.reset();
      onAddProspect(prospect);
    } catch (error) {
      console.log("Error posting data:", error);
    } 
  };


  return (
    <form id="add-internship-form" method="post" onSubmit={handleSubmit}>
        <span className="close">&times;</span>
        <h3 id="add-title">Add Prospect</h3>
        <input type="hidden" name="_id" value="-1" />
        <p>
            <label htmlFor="name ">Position Name:</label>
            <input type="text" id="name" name="name" required />
        </p>
        <p>
            <label htmlFor="company">Company:</label>
            <input type="text" id="company" name="company" required />
        </p>
        <p>
            <label htmlFor="link">Link:</label>
            <input type="text" id="link" name="link" required />
        </p>
        <p>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" />
        </p>
        <p>
            <label htmlFor="deadline">Deadline:</label>
            <input type="date" id="deadline" name="deadline" />
        </p>
        <p>
            <label htmlFor="img">Upload Image:</label>
            <input type="file" id="img" name="img" />
        </p>
        <p>
            <button id="submit-button" type="submit">Submit</button>
        </p>
    </form>
  );
};

export default AddForm;



