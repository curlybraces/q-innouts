<template>
  <q-page >
    <div id="team-header" class="bg-secondry q-pa-s text-white" :style="headerStyle">
      <div class="row justify-center">
        <div class="col relative-position">
          <div class="d-inline-block q-ml-sm">
            <div class="rope border-right border-left border-dark"></div>
            <div class="border-x border-y border-dark q-pa-xs bg-positive text-white">Seats {{team.stadium.capacity}}</div>
          </div>
        </div>
        <div class="col relative-position">
          <div class="d-inline-block absolute-center">
            <div class="rope border-right border-left border-dark"></div>
            <div class="border-x border-y border-dark q-pa-xs bg-positive text-white"> {{team.stadium.name}}</div>
          </div>
        </div>
        <div class="col relative-position">
          <div class="d-inline-block absolute-right q-mr-sm">
            <div class="rope border-right border-left border-dark"></div>
            <div class="border-x border-y border-dark q-pa-xs bg-positive text-white">Built {{team.stadium.built}}</div>
          </div>
        </div>
      </div>
      <div class="row justify-center q-pa-md">
        <div class="col-sm-3">
          <div id="team-card" class="rounded-borders">
            <div id="team-logo-wrapper">
              <img :src="'statics/'+team.logo" alt="logo" class="full-height m-auto">
            </div>
            <h4 class="text-uppercase q-mt-sm q-mb-none" :style="{backgroundColor: team.color}"> <span>{{team.name}} </span></h4>
            <!-- <p><button id="url-button" class="border-0 w-100 text-light p-1"> <i class="fas fa-globe"></i> <a href="http://" target="_blank"></a></button></p> -->
          </div>
        </div>
        <div class="col-sm-3">
          <q-markup-table flat dense id="team-info" separator="none">
            <tbody>
              <tr>
                <td class="text-left">Founded</td>
                <td class="text-right">{{team.founded}}</td>
              </tr>
              <tr>
                <td class="text-left">Internationalization</td>
                <td class="text-right">34</td>
              </tr>
              <tr>
                <td class="text-left">Average Squad Age</td>
                <td class="text-right">27</td>
              </tr>
              <tr>
                <td class="text-left">Averge Squad Score</td>
                <td class="text-right">7</td>
              </tr>
              <tr>
                <td class="text-left">Major Trophies Won</td>
                <td class="text-right">10</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <div class="col-sm-3">third</div>
      </div>
    </div>
    <q-tabs
      v-model="tab" dense inline-label @input="tabChange"
      class="bg-primary text-white shadow-2"
    >
      <q-tab name="home" icon="group_work" label="Team" />
      <q-tab name="innouts" icon="swap_horiz" label="Innouts" />
      <q-tab name="chat" icon="chat" label="Chat" />
      <q-tab name="news" icon="info" label="News" />
    </q-tabs>

    <q-tab-panels v-model="tab" swipeable animated @before-transition="panelChange"
     class="shadow-2 rounded-borders"
     >
      <q-tab-panel name="home">
        <div class="row justify-center q-mx-auto">
          <div id="team-field" class="col-md-11 q-px-sm">
            <!-- Goalkeepers -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in gks" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Defenders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RB -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rbs" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- CB -->
              <div class="col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in cbs" :key="player.id" class="col-sm-2 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- LB -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lbs" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Defensive Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in dms" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RM -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rms" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- CM -->
              <div class="col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in cms" :key="player.id" class="col-sm-2 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- LM -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lms" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Attacking Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in ams" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
            <!-- first line attackers (LWF, SS, RWF) -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RWF -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rws" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- SS -->
              <div class="col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in sss" :key="player.id" class="col-sm-2 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- LWF -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lws" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- second line attackers (CF) -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in cfs" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- manager -->
        <div class="row q-my-sm">
          <div class="col-sm-4 col-md-3 col-lg-2 offset-sm-1">
            <q-card dark class="">
              <q-card-section class="bg-primary text-center">
                Manager
              </q-card-section>
              <q-card-section class="q-mt-sm">
                <div>
                  <q-img :src="'statics/' + team.manager.picture" alt="" class="img-thumbnail" />
                    <div class="text-center text-black border-bottom border-dark ellipsis text-weight-bold">
                      {{team.manager.displayName}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{team.manager.firstName}} {{team.manager.lastName}}
                      </q-tooltip>
                    </div>
                    <div class="text-center bg-t-dark">
                      <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="team.manager.rating" :max="5" />
                    </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="innouts">
        <div class="row justify-center">
          <div class="col-sm-11">
            <div class="row justify-center q-pa-md">
              <div class="col-sm-2">
                <q-select dense rounded standout v-model="window" :options="windows"
                      option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
                      dark bg-color="primary"
                />
              </div>
            </div>
            <h6 class="text-center q-my-md">Official Transfers</h6>
            <div class="row">
              <div class="col">
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-header-table"
                    title="Ins"
                    :data="inTransfers"
                    :columns="transferInColumns"
                    row-key="id"
                    rows-per-page-label="Transfers per page"
                    :pagination.sync="myPagination"
                    :rows-per-page-options="[5,10,15]"
                    :loading="loading"
                    color="primary"
                    table-header-class="bg-primary text-white"
                  >
                    <q-td slot="body-cell-from" slot-scope="value" :props="value">
                      <div id="team-thumbnail" class="q-mx-auto">
                        <img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height">
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                            {{value.value.name}}
                        </q-tooltip>
                      </div>
                    </q-td>
                    <q-td slot="body-cell-rating" slot-scope="value" :props="value">
                      <q-rating
                        color="primary"
                        class="q-mx-auto q-mt-sm"
                        size="1.5rem"
                        icon="thumb_up"
                        :value="3"
                        :max="5"
                      />
                    </q-td>
                  </q-table>
                </div>
              </div>
              <div class="col">
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-header-table"
                    title="Outs"
                    :data="outTransfers"
                    :columns="transferOutColumns"
                    row-key="id"
                    rows-per-page-label="Transfers per page"
                    :pagination.sync="myPagination"
                    :rows-per-page-options="[5,10,15]"
                    :loading="loading"
                    color="primary"
                    table-header-class="bg-primary text-white"
                  >
                    <q-td slot="body-cell-to" slot-scope="value" :props="value">
                      <div id="team-thumbnail" class="q-mx-auto">
                        <img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height">
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                            {{value.value.name}}
                        </q-tooltip>
                      </div>
                    </q-td>
                    <q-td slot="body-cell-rating" slot-scope="value" :props="value">
                      <q-rating
                        color="primary"
                        class="q-mx-auto q-mt-sm"
                        size="1.5rem"
                        icon="thumb_up"
                        :value="3"
                        :max="5"
                      />
                    </q-td>
                  </q-table>
                </div>
              </div>
            </div>
            <q-separator spaced />
            <h6 class="text-center q-my-md">Fans' Transfers!</h6>
            <div class="row">
              <div class="col">
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-header-table"
                    title="Ins"
                    :data="wanteds"
                    :columns="wantedColumns"
                    row-key="id"
                    rows-per-page-label="Transfers per page"
                    :pagination.sync="myPagination"
                    :rows-per-page-options="[5,10,15]"
                    :loading="loading"
                    color="primary"
                    table-header-class="bg-primary text-white"
                  >
                    <q-td slot="body-cell-team" slot-scope="value" :props="value">
                      <div id="team-thumbnail" class="q-mx-auto">
                        <img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height">
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                            {{value.value.name}}
                        </q-tooltip>
                      </div>
                    </q-td>
                  </q-table>
                </div>
              </div>
              <div class="col">
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-header-table"
                    title="Outs"
                    :data="unwanteds"
                    :columns="unwantedColumns"
                    row-key="id"
                    rows-per-page-label="Transfers per page"
                    :pagination.sync="myPagination"
                    :rows-per-page-options="[5,10,15]"
                    :loading="loading"
                    color="primary"
                    table-header-class="bg-primary text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="chat">
        <div class="row justify-center">
          <div class="col-sm-9 bg-secondary border-primary rounded-borders">
            <div class="row q-pa-md">
              <div class="col-sm-9">
                <q-chat-message
                  name="me"
                  avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                  :text="['hey, how are you?']"
                  stamp="7 minutes ago"
                  sent
                  bg-color="amber-7"
                />
                <q-chat-message
                  name="Jane"
                  avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                  :text="[
                    'doing fine, how r you?',
                    'I just feel like typing a really, really, REALY long message to annoy you...'
                  ]"
                  size="6"
                  stamp="4 minutes ago"
                  text-color="white"
                  bg-color="primary"
                />
                <q-chat-message
                  name="Jane"
                  avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                  :text="['Did it work?']"
                  stamp="1 minutes ago"
                  size="6"
                  text-color="white"
                  bg-color="primary"
                />
                <q-chat-message
                  name="Jane"
                  avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                  text-color="white"
                  bg-color="primary"
                >
                  <q-spinner-dots size="2rem" />
                </q-chat-message>
              </div>
              <div class="col-sm-3 bg-primary text-white">
                <div class="q-pa-sm" style="max-width: 350px">
                  <q-list bordered separator>
                    <q-item clickable v-ripple>
                      <q-item-section>Single line item</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Item with caption</q-item-label>
                        <q-item-label caption>Caption</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-avatar>
                          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>Image avatar</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label overline>OVERLINE</q-item-label>
                        <q-item-label>Item with caption</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="news">
        <div class="row justify-center">
          <div class="col-sm-5 bg-primary text-white border-primary rounded-borders">
            <q-list bordered separator dark>
              <q-item clickable to="/">
                <q-item-section to thumbnail class="q-ml-non">
                  <img src="https://cdn.footballghana.com/2018/07/5b5b25b6c1dc9.jpg">
                </q-item-section>

                <q-item-section top>
                  <q-item-label header class="text-h6" >Chelsea Considering Goloving</q-item-label>
                  <!-- <q-item-label lines="1" caption>Chelsea Consider Signing Goloving From Monaco less than 10 months after initial failing. It is believed the negotiations are already at an advanced stage</q-item-label> -->
                </q-item-section>

                <q-item-section side >
                  <q-item-label caption>11:56</q-item-label>
                  <q-item-label caption>share</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable to="/">
                <q-item-section to thumbnail class="q-ml-non">
                  <img src="https://cdn.quasar.dev/img/mountains.jpg">
                </q-item-section>

                <q-item-section top>
                  <q-item-label header class="text-h6" >Single line item</q-item-label>
                </q-item-section>

                <q-item-section side >
                  <q-item-label caption>11:56</q-item-label>
                  <!-- <q-item-label caption></q-item-label> -->
                </q-item-section>
              </q-item>

              <q-item clickable to="/">
                <q-item-section to thumbnail class="q-ml-non">
                  <img src="https://cdn.quasar.dev/img/mountains.jpg">
                </q-item-section>

                <q-item-section top>
                  <q-item-label header class="text-h6" >Single line item</q-item-label>
                </q-item-section>

                <q-item-section side >
                  <q-item-label caption>11:56</q-item-label>
                  <q-item-label caption>share</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Team',

  data () {
    return {
      team: null,
      gks: [],
      cbs: [],
      lbs: [],
      rbs: [],
      dms: [],
      cms: [],
      lms: [],
      rms: [],
      ams: [],
      lws: [],
      rws: [],
      sss: [],
      cfs: [],
      tab: 'home',
      panel: 'home',
      headerStyle: {},
      transferInColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'from', align: 'center', label: 'From', field: row => row.from },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row.rating, sortable: true },
      ],
      transferOutColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row.rating, sortable: true },
      ],
      wantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'team', align: 'center', label: 'Team', field: row => row.targetTeam },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.date, sortable: true },
      ],
      unwantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'position', align: 'center', label: 'Position', field: row => row.broadPosition },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.date, sortable: true },
      ],
      windows: [],
      window: null,
      inTransfers: [],
      outTransfers: [],
      wanteds: [],
      unwanteds: []
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/teams/' + to.params.team)
      .then(response => {
        next(vm => {
          vm.team = response.data.data
          vm.headerStyle.backgroundImage = 'url(statics/' + vm.team.stadium.picture + ')'
          vm.headerStyle.backgroundPosition = vm.team.stadium.position
          vm.team.players.forEach(element => {
            // alert(element)
            switch (element.specificPosition) {
              case 'GK':
                vm.gks.push(element)
                break
              case 'CB':
                vm.cbs.push(element)
                break
              case 'LB':
                vm.lbs.push(element)
                break
              case 'RB':
                vm.rbs.push(element)
                break
              case 'DM':
                vm.dms.push(element)
                break
              case 'RM':
                vm.rms.push(element)
                break
              case 'LM':
                vm.lms.push(element)
                break
              case 'CM':
                vm.cms.push(element)
                break
              case 'AM':
                vm.ams.push(element)
                break
              case 'RW':
                vm.rws.push(element)
                break
              case 'LW':
                vm.lws.push(element)
                break
              case 'SS':
                vm.sss.push(element)
                break
              case 'CF':
                vm.cfs.push(element)
                break
            }
          })
        })
      })
      .catch(error => {
        from.error = error
        next(false)
      })
  },

  beforeCreate: function () {
    this.$q.loading.show({
      delay: 400 // ms
    })
  },

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
    this.$q.loading.hide()
  },

  methods: {
    tabChange: function (value) {
      // alert('hey')
    },

    panelChange: function (newVal, oldVal) {
      if (newVal === 'innouts' && this.windows.length === 0) {
        this.$q.loading.show()
        axios.get('http://innouts.test/api/windows')
          .then(response => {
            this.windows = response.data.data
            this.window = this.windows[0]
            this.transfers = this.window.transfers
            this.windowChange()
            this.loading = false
            this.$q.loading.hide()
          })
          .catch(error => {
            this.error = error
          })
      }
    },

    windowChange: function () {
      this.inTransfers = []
      this.outTransfers = []
      this.wanteds = []
      this.unwanteds = []

      this.transfers.forEach(elem => {
        if (elem.from.id === this.team.id) {
          this.outTransfers.push(elem)
        } else if (elem.to.id === this.team.id) {
          this.inTransfers.push(elem)
        }
      })

      this.window.wanteds.forEach(elem => {
        if (elem.suitor.id === this.team.id) {
          this.wanteds.push(elem)
        }
      })

      this.window.unwanteds.forEach(elem => {
        if (elem.player.team_id === this.team.id) {
          this.unwanteds.push(elem)
        }
      })
    }
  },

  watch: {
    window () {
      this.loading = true
      this.transfers = this.window.transfers
      this.windowChange()
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">

#team-card
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
  margin: 0;
  background-color: rgba(0, 31, 65, 0.55);

  #team-logo-wrapper
      height: 215px;
      max-width: 60%;
      margin: auto;

  h1
    font-size: 2em;
    background-color:  rgba(46, 108, 224, 0.4);

#team-info

  table
    color: white;
    background-color: rgba(0, 31, 63, 0.3);
    width: 60%;

    th, td
      padding: 0.2rem;

.player-card
  margin-bottom: 1rem;

  a
    text-decoration: none;
    color: #000;

  img
    display: block;
    width: 180px;
    height: 180px;
    margin: auto;

  .img-thumbnail
    padding: .25rem;
    background-color: #f5f8fa;
    border: 1px solid #dee2e6;
    border-radius: .25rem;

#team-field
  background-image: url(/statics/images/pitch.png);
  background-size: cover;

</style>
