//handles API calls

export const getProspects = async () => {
  try {
    const response = await fetch("/api/prospects/");
    if (!response.ok) {
      throw new Error("Failed to fetch prospects");
    }
    return await response.json();
  } catch (error) {
    console.log('There was a problem with the fetch operation:', error);
  }
};

export const updateProspectStatus = async (id, completed) => {
  try {
    let response = await fetch(`/api/prospects/${id}/completed`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
      throw new Error("Failed to update prospect status");
    }
    return await response.json();
  } catch (error) {
    console.log('There was a problem with the fetch operation:', error);
  }
};

export const deleteProspect = async (prospect) => {
  try {
    let response = await fetch(`/api/prospects/${prospect._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  
    if (!response.ok) {
      console.log("error deleting prospect");
      throw new Error("Error deleting prospect");
    } 
    return await response.json();
  } catch (error) {
    console.log("Error deleting prospect:", error);
  }
};

