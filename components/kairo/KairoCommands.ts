export function executeKairoCommand(
 command:string
){


 const text =
 command.toLowerCase();



 if(
 text.includes("test")
 ){

   alert(
    "Otevírám AI test modul"
   );

   return;

 }



 if(
 text.includes("flash")
 ||
 text.includes("kartič")
 ){

   alert(
    "Otevírám flashcards"
   );

   return;

 }



 if(
 text.includes("úkol")
 ){

   alert(
    "Otevírám plán úkolů"
   );

   return;

 }



 alert(
  "Kairo zatím nerozumí tomuto příkazu."
 );


}
