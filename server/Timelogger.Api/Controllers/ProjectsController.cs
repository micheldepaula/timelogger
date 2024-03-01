using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;

		public ProjectsController(ApiContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("hello-world")]
		public string HelloWorld()
		{
			return "Hello Back!";
		}

		// GET api/projects
		[HttpGet]
		public IActionResult Get()
		{
			

			return Ok(_context.Projects);
		}


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
		public IActionResult GetById(int id)
        {
            var project =  _context.Projects.Find(id);
            return Ok(project);
        }

        // POST api/projects
        [HttpPost]
        public IActionResult Post([FromBody] Project project)
        {
            Console.WriteLine("aquiii {0} : ", project.Name);
            _context.Projects.Add(project);

            _context.SaveChanges();

            return Ok(project);
        }


        // PUT api/projects
        [HttpPut]
        public IActionResult Put([FromBody] Project project)
        {
            Console.WriteLine("aquiii {0} : ", project.Name);
            _context.Projects.Update(project);
            _context.SaveChanges();

            return Ok(project);
        }
        

    }
}
