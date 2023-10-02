export default function handler (req, res) {
  res.status(200).json({pageName: 'Home Page'})
  res.status(200).json({name: 'Jon Doe'})
}