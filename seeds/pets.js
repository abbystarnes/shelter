
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('pets').insert([
        { status: 'Available',
    age: 'Adult',
    size: 'XL',
    breed: 'Pit Bull Terrier',
    name: 'Coco',
    sex: 'Female',
    description: 'Coco can think of nothing she would enjoy more than a household where she could have love pretty much all the time. Yes, she is that responsive and loving with humans. That said, she is getting along famously with her resident foster dog sibling and they are finding it fun to play keep-away and tug with toys, so she\'s got a playful streak as well. Coco is fully house trained and appears crate trained, too. However, unless a human wants to be in there with her, she would much prefer to be out and about with her family than in her crate. She does get a titch restless if left alone in the crate for too long. Coco has spurts of energy when play is her first agenda, but she would be very happy in a home where there\'s far more snuggle and chill out time than busy activity time. She\'s a happy go lucky gal; all you have to do is look her way and her tail starts spinning in glee. Oh, since she is so well adjusted to life as she knows it, I forgot to mention that she is a tripod, one who gets along very well with three legs. Come meet Coco today, she doesn\'t want you to lose out on any more time to pet and snuggle with her. June 25, 2017, 4:25 am',
    petID: '17947520',
    type: 'Dog',
    photo: 'http://photos.petfinder.com/photos/pets/17947520/1/?bust=1497394914&width=500&-x.jpg' },
    { status: 'Available',
age: 'Senior',
size: 'L',
breed: 'German Shepherd Dog',
name: 'Ranger Rick',
sex: 'Male',
description: 'Some have said Ranger Rick resembles a giant chihuahua - this does not faze Ranger Rick one bit! He is an absolutely adorable smart-as-a-whip mature guy who knows who he is. Although he does not deny that he may have a very distant cousin who at one time dated a chihuahua! He is a volunteer favorite and often hears the ooh and aahs of people who meet him. With his adorable looks and sweet personality, Ranger Rick will put a smile on your face. Ranger Rick can be a very goofy boy. He loves playing fetch with a tennis ball and will enjoy running around the yard with you. He likes going on walks and exploring. Ranger Rick also has a very sensitive side and genuinely appreciates affection from his humans. Ranger Rick walks very well on leash and is polishing up his \'place\' and \'come\' commands. He is super smart and enjoys his training sessions as they keep his mind active and is in the Total Obedience Program. The Total Obedience Program (TOP) is modelled after the AKC\'s Canine Good Citizen (CGC) test. As a TOP dog, Ranger Rick has a personalized training plan and works with a volunteer trainer several times a week to help him learn the skills to become the best dog he can be! He is learning skills like sit and down, walking nicely on leash, sitting calmly when approached by strangers or other dogs, staying in a sit or down until told \'free,\' and coming when called. Once Ranger Rick successfully completes all the skills on his training plan he will be considered TOP Dog Ready! Ranger Rick is working hard to become a wonderful pet and as a part of APA\'s Total Obedience Program you can work with APA staff to continue to build a training relationship with Ranger Rick after adoption and master all the TOP dog skills together. Check out a video on APA\'s CGC program, on which the TOP was based: https://vimeo.com/89434193 Why not take a chance and come on down to meet the irresistible pup who is looking for his family and forever home!',
petID: '37295784',
type: 'Dog',
photo: 'http://photos.petfinder.com/photos/pets/37295784/1/?bust=1496723431&width=500&-x.jpg' },
{ status: 'Available',
age: 'Adult',
size: 'XL',
breed: 'Hound',
name: 'Beau',
sex: 'Male',
description: 'Beau is a classically handsome hound dog. He loves to do rugged, handsome things like play fetch and pose for photographs. You might assume he is a Clint Eastwood-type, but he is really a goofball. Just watch him try to play fetch by himself, and you will realize there\'s not a whole lot of self-consciousness going on. Beau is house trained, crate trained, walks well on a leash and knows sit. He can be a bit awkward when meeting new people and animals, but he is super affectionate with the people he gets to know, and he has lived with other dogs before. Since he does have some hound in him, he tends to emote very dramatically. \'I have to use the potty\' comes out like an epic, mournful howl to the moon. Beau has been bounced around a bit, but is very ready to settle into a forever home. He\'s a funny guy with a big personality, and even bigger potential. Come meet him!',
petID: '37295791',
type: 'Dog',
photo: 'http://photos.petfinder.com/photos/pets/37295791/1/?bust=1496723444&width=500&-x.jpg' }
      ]);
    });
};
