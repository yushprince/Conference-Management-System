import prisma from '../utils/database.js'
export const conference = async(req ,res) =>{
 try {
  const { name, start, end } = req.body; // Assuming userIds is an array of user IDs to associate with the conference

  // Create a new conference
  const newConference = await prisma.conference.create({
    data: {
      name,
      start: new Date(start), // Convert to Date object
      end: new Date(end), // Convert to Date object
     
    }
  });

  res.status(201).json({ message: 'Conference created successfully', conference: newConference });
} catch (error) {
  console.error("Error creating conference", error);
  res.status(500).json({ message: 'Internal Server Error' });
}

}


export const all = async(req,res) =>{
 try{

  let result = await prisma.conference.findMany()
  return res.status(200).json({
   status : 'true',
   data : result
  })
 }catch(error){
  console.error("Error creating conference", error);
  res.status(500).json({ message: 'Internal Server Error' });
 }
}
