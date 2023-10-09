using Microsoft.AspNetCore.Routing;
using MongoDB.Bson;
using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Services
{
    public class TrainRoutesService
    {
        private readonly TrainRoutesRepository _repository;

        public TrainRoutesService(TrainRoutesRepository repository)
        {
            _repository = repository;
        }

        public async Task CreateRoute(TrainRouteReqDto req)
        {
            var exRoute = _repository.GetRouteByStartAndEnd(req.StartStation,req.EndStation);
            if(exRoute.Result != null)
            {
                throw new Exception("This route all ready exsit"); 
            }
            List<TrainStopStations> trainStopStations = new();
            if (req.Stations.Count > 0)
            {
                foreach (var st in req.Stations)
                {
                    TrainStopStations trainStopStations1 = new()
                    {
                        Name = st.Name,
                        Order = st.Order,
                    };
                    trainStopStations.Add(trainStopStations1);
                }
            }
            TrainRoutes trainRoutes = new()
            {
                RouteName=req.RouteName,
                StartStation=req.StartStation,
                EndStation=req.EndStation,
                Stations= trainStopStations,
                IsDisable = false,
                IsDelete = false
            };
            await _repository.CreateAsync(trainRoutes);
        }

        public async Task DeleteRoute(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }

            TrainRoutes exRoute = await _repository.GetById(objectId) ?? throw new Exception("This route not exsit");
            //TODO: check have any assigned shedules
            await _repository.DeleteRoute(exRoute.Id);
        }

        public async Task DisableRoute(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }

            TrainRoutes exRoute = await _repository.GetById(objectId) ?? throw new Exception("This route not exsit");
            //TODO: check have any assigned shedules
            await _repository.DisableRoute(exRoute.Id);
        }

        public async Task EnableRoute(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }

            TrainRoutes exRoute = await _repository.GetById(objectId) ?? throw new Exception("This route all ready exsit");
            await _repository.EnableRoute(exRoute.Id);
        }

        public async Task UpdateRoute(string id,TrainRouteReqDto req)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }

            TrainRoutes exRoute = await _repository.GetById(objectId) ?? throw new Exception("This route all ready exsit");
            exRoute.Stations = req.Stations;
            await _repository.UpdateRoute(exRoute);
        }

        public async Task<List<TrainRouteResDto>> GetAllRoutes()
        {
            List<TrainRoutes> routes = await _repository.GetAllTrainRoutesAsync();
           List<TrainRouteResDto> trainRouteResDtos = new();
            if (routes != null && routes.Count > 0)
            {
                foreach (var item in routes)
                {
                    List< TrainStopStations >  trainStopStations = new();
                    if(item.Stations.Count > 0)
                    {
                        foreach (var st in item.Stations)
                        {
                            TrainStopStations trainStopStations1 = new()
                            {
                                Name = st.Name,
                                Order = st.Order,
                            };
                            trainStopStations.Add(trainStopStations1);
                        }
                    }
                    TrainRouteResDto trainRouteResDto = new()
                    {
                        Id = item.Id.ToString().Substring(0, 24),
                        Stations = trainStopStations,
                        EndStation = item.EndStation,
                        StartStation = item.StartStation,
                        RouteName = item.RouteName,
                        IsDisable = item.IsDisable
                    };
                    trainRouteResDtos.Add(trainRouteResDto);
                }
            }

            return trainRouteResDtos;
        }

        public async Task<List<TrainRouteResDto>> GetAllRoutesByNotInActive()
        {
            List<TrainRoutes> routes = await _repository.GetAllTrainRoutesByNotInActiveAsync();
            List<TrainRouteResDto> trainRouteResDtos = new();
            if (routes != null && routes.Count > 0)
            {
                foreach (var item in routes)
                {
                    List<TrainStopStations> trainStopStations = new();
                    if (item.Stations.Count > 0)
                    {
                        foreach (var st in item.Stations)
                        {
                            TrainStopStations trainStopStations1 = new()
                            {
                                Name = st.Name,
                                Order = st.Order,
                            };
                            trainStopStations.Add(trainStopStations1);
                        }
                    }
                    TrainRouteResDto trainRouteResDto = new()
                    {
                        Id = item.Id.ToString().Substring(0, 24),
                        Stations = trainStopStations,
                        EndStation = item.EndStation,
                        StartStation = item.StartStation,
                        RouteName = item.RouteName,
                        IsDisable = item.IsDisable
                    };
                    trainRouteResDtos.Add(trainRouteResDto);
                }
            }

            return trainRouteResDtos;
        }
    }
}
