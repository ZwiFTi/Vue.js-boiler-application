<template> 
  <v-layout row wrap> 
    <v-flex xs4 v-for="movie in movies" 
            :key="movie._id"> 
      <v-card> 
        <v-card-title primary-title> 
          <div>
              <div class="headline"> 
                <v-btn flat v-bind:to="`/movies/${movie._id}`">
                  {{ movie.name }} 
                </v-btn> 
              </div>
            <span class="grey--text">{{ movie.release_year }} ‧ {{ movie.genre }}</span> 
          </div> 
        </v-card-title> 
        <v-card-text> {{ movie.description }} </v-card-text> 
      </v-card> 
    </v-flex> 
  </v-layout> 
</template>

<script>
import axios from 'axios';

/*
This code calls a method when the page loads,
which is defined in the mounted method.
The method fetches the movies using an axios request.
Now we have pulled the data from the server to the client.
*/
export default { 
  name: 'Movies', 
  data() { 
    return { 
      movies: [], 
    }; 
  }, 
  mounted() { 
    this.fetchMovies(); 
  }, 
  methods: { 
    async fetchMovies() { 
      return axios({ 
        method: 'get',
        url: 'http://localhost:8081/movies', 
        })
        .then((response) => { 
          this.movies = response.data.movies; 
        }) 
        .catch(() => { 
        }); 
    }, 
  }, 
};
</script>