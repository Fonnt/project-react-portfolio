/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import {
  OuterWrapperSection,
  InnerWrapperSection,
  BlueTitle
} from 'styles/ProjectStyles';

import FeaturedProjects, { FeaturedProjectsWrapper } from './FeaturedProjects';
import OtherProjects from './OtherProjects';

const Projects = () => {
  const [projectsFromGithub, setProjectsFromGithub] = useState([]);

  const featuredProjectsToFilter = ['project-weather-app', 'project-happy-thoughts', 'project-music-releases', 'project-movies']
  const otherProjectsToFilter = ['project-chat-bot', 'project-guess-who', 'project-news-site']

  const API_KEY = 'FonnT'
  const API_URL = `https://api.github.com/users/${API_KEY}/repos`

  const fetchAPI = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProjectsFromGithub(data))
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
      .finally(() => console.log('no errors'))
  }

  useEffect(() => {
    fetchAPI()
  }, []);

  const featuredProjectsFiltered = (projectsFromGithub.filter((project) => featuredProjectsToFilter.includes(project.name)));
  const otherProjectsFiltered = (projectsFromGithub.filter((project) => otherProjectsToFilter.includes(project.name)));

  const featuredProjectsReadyToDisplay = featuredProjectsFiltered.map((project) => {
    const imageLink = `https://raw.githubusercontent.com/${API_KEY}/${project.name}/${project.default_branch}/code/src/assets/featured-image.jpg`
    return (
      <FeaturedProjects
        key={project.id}
        deploymentLink={project.homepage}
        gitLink={project.html_url}
        // eslint-disable-next-line newline-per-chained-call
        title={project.name.replace(/project-/, '').replace(/-/, ' ').replace(/ app/, '').concat(' app').toUpperCase()}
        description={project.description}
        tags={project.topics}
        image={imageLink} />
    )
  })

  const otherProjectsReadyToDisplay = otherProjectsFiltered.map((project) => {
    return (
      <OtherProjects
        key={project.id}
        deploymentLink={project.homepage}
        gitLink={project.html_url}
        title={project.name}
        description={project.description}
        tags={project.topics} />
    )
  })
  return (
    <>
      <OuterWrapperSection grey>
        <InnerWrapperSection>
          <BlueTitle>FEATURED PROJECTS</BlueTitle>
          <FeaturedProjectsWrapper>
            {featuredProjectsReadyToDisplay}
          </FeaturedProjectsWrapper>
        </InnerWrapperSection>
      </OuterWrapperSection>
      <OuterWrapperSection grey>
        <InnerWrapperSection>
          <BlueTitle>OTHER PROJECTS</BlueTitle>
          {otherProjectsReadyToDisplay}
        </InnerWrapperSection>
      </OuterWrapperSection>
    </>
  )
}

export default Projects;